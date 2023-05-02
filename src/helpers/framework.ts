import axios from "axios";
import chalk from "chalk";

import { githubApiUrlMap } from "./constants";
import { cloneUi, cloneProgram } from "./git";

export async function downloadFiles(
  framework: string,
  program: string,
  root: string,
  dappName: string,
): Promise<void> {
  await cloneUi(framework, root);
  await cloneProgram(program, root, dappName);
}

export async function validateFramework(
  framework: string,
  type: string,
): Promise<void> {
  if (!githubApiUrlMap.get(framework)) {
    throwUnsupportedFrameworkError(framework, type);
  }
}

export async function urlExists(url: string) {
  try {
    return (await axios.get(url)).status == 200;
  } catch (_) {
    return false;
  }
}

function throwUnsupportedFrameworkError(framework: string, type: string): void {
  console.error(
    `Unsupported ${chalk.yellow(type)} framework: ${chalk.red(
      `"${framework}"`,
    )}.`,
  );
  console.log(
    `   Try ${chalk.magentaBright(
      "create-solana-dapp --help",
    )} to see supported frameworks.`,
  );
  console.log();
  process.exit(1);
}
