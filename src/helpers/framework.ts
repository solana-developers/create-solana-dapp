import chalk from "chalk";
import urlExists from "url-exist";

import { 
    githubCodeloadBaseUrl, 
    githubApiBaseUrl, 
    githubUiRepository, 
    githubProgramRepository, 
    githubRef, 
    programFrameworksList, 
    uiFrameworksList, 
} from "./constants";


export function validateUiFramework(framework: string): Promise<boolean> {
    if (!uiFrameworksList.some(x => x === framework)) {
        throwUnsupportedFrameworkError(framework, "UI");
    }
    const url: string = `${githubApiBaseUrl}/${githubUiRepository}-${encodeURIComponent(
        framework,
    )}?ref=${githubRef}`;
    console.log(`URL: ${url}`);
    return urlExists(url);
}

export function validateProgramFramework(program: string): Promise<boolean> {
    if (!programFrameworksList.some(x => x === program)) {
        throwUnsupportedFrameworkError(program, "program");
    }
    const url: string = `${githubApiBaseUrl}/${githubProgramRepository}/${encodeURIComponent(
        program,
    )}?ref=${githubRef}`;
    console.log(`URL: ${url}`);
    return urlExists(url);
}

export function throwUnsupportedFrameworkError(framework: string, type: string): void {
    let supported: string[] = [];
    if (type === "program") {
        supported = programFrameworksList;
    } else {
        supported = uiFrameworksList;
    }
    console.error(
        `Unsupported ${type} framework: ${chalk.red(`"${framework}"`)}.`,
    );
    console.log(
        `   Supported ${type} frameworks: ${chalk.greenBright(supported)}`
    );
    console.log();
    process.exit(1);
}

export function throwFrameworkNotFoundError(framework: string, type: string): void {
    console.error(
      `Could not locate ${type} framework: ${chalk.red(`"${framework}"`)}.`,
    );
    process.exit(1);
  }