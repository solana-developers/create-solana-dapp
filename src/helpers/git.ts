import chalk from "chalk";
import { execSync } from "child_process";
import fsExtra from "fs-extra";
import path from "path";

import { githubUiCloneUrlBase, githubProgramCloneUrl } from './constants';


export function shouldUseGit(): void {
  try {
    execSync("git --version", { stdio: "ignore" });
  } catch (error) {
    console.error(`${chalk.greenBright("git")} is necessary for ${chalk.magentaBright("create-solana-dapp")}. Install via the official documentation:`);
    console.log();
    console.log(chalk.greenBright("  https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"));
    process.exit(1);
  }
}

export function tryGitInit(dir: string): boolean {
  try {
    execSync(`git init ${dir}`, { stdio: "ignore" });
    return true;
  } catch (error) {
    try {
      fsExtra.removeSync(path.join(dir, ".git"));
    } catch (_) {
      //
    }
    return false;
  }
}

export async function cloneUi(framework: string, root: string): Promise<void> {
  const gitCloneUrl = githubUiCloneUrlBase + "-" + framework + ".git";
  await gitClone(gitCloneUrl, root + "/app");
  execSync(`rm -rf ${root}/app/.git`, { stdio: "ignore" });
}

export async function cloneProgram(program: string, root: string, dappName: string): Promise<void> {
  const gitCloneUrl = githubProgramCloneUrl;
  await gitClone(gitCloneUrl, root + "/temp");
  execSync(`mv ${root}/temp/templates/${program} ${root}/program`, { stdio: "ignore" });
  if (program === "anchor") {
    execSync(`mv ${root}/program/programs/some-program-name ${root}/program/programs/${dappName}`, { stdio: "ignore" });
    execSync(`mv ${root}/program/tests/some-program-name.ts ${root}/program/tests/${dappName}.ts`, { stdio: "ignore" });
  }
  execSync(`mv ${root}/temp/templates/README.md ${root}/README.md`, { stdio: "ignore" });
  execSync(`rm -rf ${root}/temp`, { stdio: "ignore" });
}

async function gitClone(repository: string, targetDir: string) {
  try {
    execSync(`git clone ${repository} ${targetDir}`, { stdio: "ignore" });
  } catch (error) {
    throwGitCloneError(repository);
  }
}

function throwGitCloneError(repository: string): void {
  console.error(
      `Error cloning repository: ${chalk.red(`"${repository}"`)}.`,
  );
  console.log();
  process.exit(1);
}
