import { execSync } from "child_process";
import type { ChildProcess } from "child_process";
import { assert } from "chai";
import spawn from "cross-spawn";
import fs from "fs";
import path from "path";
import kill from "tree-kill";

/**
 * Note: You must launch a local Solana validator for the last two tests.
 *
 *      ie:     `solana-test-validator`
 *
 *      Launch in a separate shell.
 */

describe("create-solana-dapp", async () => {
  const testDappNameNextAnchor: string = "test-dapp-next-anchor";
  const testDappNameNextNative: string = "test-dapp-next-native";
  const testDappNameVueAnchor: string = "test-dapp-vue-anchor";
  const testDappNameVueNative: string = "test-dapp-vue-native";
  // const testDappNameSvelteAnchor: string = "test-dapp-svelte-anchor";
  // const testDappNameSvelteNative: string = "test-dapp-svelte-native";

  const testDappNameNotCreated: string = "test-dapp-null";

  const cliCommand: string = "node dist/index.js ";

  const originalDir = process.cwd();

  before(() => {
    console.log();
    console.log("Launching tests for create-solana-dapp");
    console.log();
    console.log("Initializing test repositories. This may take a minute...");
    console.log();
    execSync(`${cliCommand}${testDappNameNextAnchor} -f next -p anchor`, {
      stdio: "ignore",
    });
    execSync(`${cliCommand}${testDappNameNextNative} -f next -p native`, {
      stdio: "ignore",
    });
    execSync(`${cliCommand}${testDappNameVueAnchor} -f vue -p anchor`, {
      stdio: "ignore",
    });
    execSync(`${cliCommand}${testDappNameVueNative} -f vue -p native`, {
      stdio: "ignore",
    });
    // execSync(`${cliCommand}${testDappNameSvelteAnchor} -f svelte -p anchor`);
    // execSync(`${cliCommand}${testDappNameSvelteNative} -f svelte -p native`, { stdio: "ignore" });
  });

  async function testCli(cmd: string, opts?: string): Promise<boolean> {
    let res: boolean;
    console.log(opts ? cmd + " " + opts : cmd);
    try {
      execSync(opts ? cmd + " " + opts : cmd);
      res = true;
    } catch (_) {
      res = false;
    }
    return res;
  }

  it("Missing project-name arg", async () => {
    assert(!(await testCli(cliCommand)));
  });

  it("Project naming conventions", async () => {
    const invalidProjectNames: string[] = [
      "test-dapp_alpha", // No specials besides '-'
      "test/dapp-beta",
      "test%dapp-charlie",
      "*",
      ".",
      "-test-dapp-foxtrot", // Can't start with '-'
      "-test-dapp-hotel", // Can't end with '-'
    ];
    for (var name of invalidProjectNames) {
      assert(!(await testCli(cliCommand + name)));
    }
  });

  it("Directory already exists", async () => {
    const dir = "no-overwriting";
    execSync(`mkdir ${dir}`, { stdio: "ignore" });
    assert(!(await testCli(cliCommand + dir)));
    execSync(`rm -rf ${dir}`, { stdio: "ignore" });
  });

  it("Invalid UI framework", async () => {
    const invalidUiFrameworkOpt = "-f something";
    assert(
      !(await testCli(
        cliCommand + testDappNameNotCreated,
        invalidUiFrameworkOpt,
      )),
    );
    let dirCreated: boolean = fs.existsSync(testDappNameNotCreated);
    if (dirCreated) {
      execSync(`rm -rf ${testDappNameNotCreated}`, { stdio: "ignore" });
    }
    assert(!dirCreated);
  });

  it("Invalid program framework", async () => {
    const invalidProgramFrameworkOpt = "-p something";
    assert(
      !(await testCli(
        cliCommand + testDappNameNotCreated,
        invalidProgramFrameworkOpt,
      )),
    );
    let dirCreated: boolean = fs.existsSync(testDappNameNotCreated);
    if (dirCreated) {
      execSync(`rm -rf ${testDappNameNotCreated}`, { stdio: "ignore" });
    }
    assert(!dirCreated);
  });

  async function testYarnInstall(
    dappName: string,
    subdir: string,
  ): Promise<void> {
    process.chdir(path.join(originalDir, dappName, subdir));
    assert(execSync("yarnpkg install"));
    process.chdir(originalDir);
  }

  it("Yarn install is valid for app: next", async () => {
    await testYarnInstall(testDappNameNextNative, "app");
  });

  it("Yarn install is valid for app: vue", async () => {
    await testYarnInstall(testDappNameVueAnchor, "app");
  });

  // it("Yarn install is valid for app: svelte", async () => {
  //     await testYarnInstall(testDappNameSvelteAnchor, "app");
  // });

  it("Yarn install is valid for program: anchor", async () => {
    await testYarnInstall(testDappNameNextAnchor, "program");
  });

  it("Yarn install is valid for program: native", async () => {
    await testYarnInstall(testDappNameVueNative, "program");
  });

  async function appRuns(arg: string, dappName: string): Promise<void> {
    let success: boolean = true;
    process.chdir(path.join(originalDir, dappName, "app"));
    try {
      const child: ChildProcess = spawn("yarn", [arg], { stdio: "ignore" });
      await new Promise(resolve => setTimeout(resolve, 5 * 1000));
      assert(child.pid);
      kill(child.pid);
    } catch (_) {
      success = false;
    }
    assert(success);
    process.chdir(originalDir);
  }

  it("The app runs for next", async () => {
    await appRuns("dev", testDappNameNextAnchor);
  });

  it("The app runs for vue", async () => {
    await appRuns("serve", testDappNameVueAnchor);
  });

  // it("The app runs for svelte", async () => {
  //     await appRuns("dev", testDappNameSvelteAnchor);
  // });

  async function programBuilds(
    command: string,
    dappName: string,
  ): Promise<void> {
    process.chdir(path.join(originalDir, dappName, "program"));
    assert(execSync(command));
    process.chdir(originalDir);
  }

  it("The program builds successfully for anchor", async () => {
    await programBuilds("anchor build", testDappNameNextAnchor);
  });

  it("The program builds successfully for native", async () => {
    await programBuilds(
      "cargo build-bpf --manifest-path=./program/Cargo.toml --bpf-out-dir=./program/target/solana",
      testDappNameNextNative,
    );
  });

  async function programRuns(
    commands: string[],
    dappName: string,
  ): Promise<void> {
    process.chdir(path.join(originalDir, dappName, "program"));
    for (var cmd of commands) {
      assert(execSync(cmd));
    }
    process.chdir(originalDir);
  }

  async function swapAnchorProgramId(dappName: string) {
    process.chdir(path.join(originalDir, dappName, "program"));
    const anchorDefaultProgramId: string =
      "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS";
    const programId: string = JSON.parse(
      fs.readFileSync(
        path.join(
          process.cwd(),
          "target",
          "idl",
          `${dappName.replace(/-/g, "_")}.json`,
        ),
        "utf-8",
      ),
    ).metadata.address;
    const filesToChange = [`Anchor.toml`, `programs/${dappName}/src/lib.rs`];
    for (var file of filesToChange) {
      const pathToFile = path.join(process.cwd(), file);
      fs.readFile(pathToFile, "utf-8", (err, data) => {
        if (err) return console.log(err);
        fs.writeFile(
          pathToFile,
          data.replace(anchorDefaultProgramId, programId),
          "utf-8",
          err => {
            if (err) return console.log(err);
          },
        );
      });
      await new Promise(resolve => setTimeout(resolve, 10 * 1000));
    }
    process.chdir(originalDir);
  }

  it("The program test runs successfully for anchor", async () => {
    await programRuns(
      ["anchor build", "anchor deploy"],
      testDappNameNextAnchor,
    );
    await swapAnchorProgramId(testDappNameNextAnchor);
    await programRuns(
      ["anchor build", "anchor deploy", "anchor run test"],
      testDappNameNextAnchor,
    );
  });

  it("The program test runs successfully for native", async () => {
    await programRuns(
      [
        "cargo build-bpf --manifest-path=./program/Cargo.toml --bpf-out-dir=./program/target/solana",
        `solana program deploy ./program/target/solana/${testDappNameNextNative.replace(
          /-/g,
          "_",
        )}.so`,
        "yarn run test",
      ],
      testDappNameNextNative,
    );
  });

  after(async () => {
    console.log();
    console.log("Cleaning up...");
    console.log();
    await new Promise(resolve => setTimeout(resolve, 10 * 1000));
    execSync(`rm -rf ${path.join(process.cwd(), testDappNameNextAnchor)}`, {
      stdio: "ignore",
    });
    execSync(`rm -rf ${path.join(process.cwd(), testDappNameNextNative)}`, {
      stdio: "ignore",
    });
    execSync(`rm -rf ${path.join(process.cwd(), testDappNameVueAnchor)}`, {
      stdio: "ignore",
    });
    execSync(`rm -rf ${path.join(process.cwd(), testDappNameVueNative)}`, {
      stdio: "ignore",
    });
    // execSync(`rm -rf ${path.join(process.cwd(), testDappNameSvelteAnchor)}`, { stdio: "ignore" });
    // execSync(`rm -rf ${path.join(process.cwd(), testDappNameSvelteNative)}`, { stdio: "ignore" });
    console.log("Test completed.");
    console.log();
  });
});
