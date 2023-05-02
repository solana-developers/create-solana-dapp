import chalk from "chalk";
import { execSync } from "child_process";
import type { ChildProcess } from "child_process";
import spawn from "cross-spawn";

export function installDeps(dir: string): Promise<void> {
  return new Promise(function (resolve, reject) {
    const command: string = "yarnpkg";
    const args: string[] = ["install"];
    args.push("--cwd", dir);

    const child: ChildProcess = spawn(command, args, {
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
      stdio: "inherit",
    });
    child.on("close", function (code: number) {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}

export function shouldUseYarn(): void {
  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
  } catch (error) {
    console.error(
      `${chalk.greenBright("yarn")} is necessary for ${chalk.magentaBright(
        "create-solana-dapp",
      )}. Install via the official documentation:`,
    );
    console.log();
    console.log(
      chalk.greenBright("  https://classic.yarnpkg.com/en/docs/install"),
    );
    process.exit(1);
  }
}

export function shouldUseYarnWorkspaces(): void {
  const yarnVersion: string = execSync("yarnpkg --version", {
    encoding: "utf8",
  });
  if (yarnVersion.startsWith("0")) {
    const workspacesFlag: string = execSync(
      "yarnpkg config get workspaces-experimental",
      { encoding: "utf8" },
    );
    if (!workspacesFlag.startsWith("true")) {
      console.error(
        `yarn's ${chalk.greenBright(
          "workspaces",
        )} feature is necessary for ${chalk.magentaBright(
          "create-solana-dapp",
        )}. Enable it with:`,
      );
      console.log();
      console.log(
        chalk.greenBright("  yarn config set workspaces-experimental true"),
      );
      process.exit(1);
    }
  }
}
