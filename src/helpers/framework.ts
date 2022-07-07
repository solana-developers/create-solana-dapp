import chalk from "chalk";
import urlExists from "url-exist";

import { 
    githubCodeloadBaseUrl, 
    githubApiBaseUrl, 
    githubProgramFrameworkPath, 
    githubUiFrameworkPath, 
    githubRef
} from "./constants";


export function hasUiFramework(framework: string): Promise<boolean> {
    const url: string = `${githubApiBaseUrl}/${githubUiFrameworkPath}-${encodeURIComponent(
        framework,
    )}?ref=${githubRef}`;
    return urlExists(url);
}

export function hasProgramFramework(framework: string): Promise<boolean> {
    const url: string = `${githubApiBaseUrl}/${githubProgramFrameworkPath}/${encodeURIComponent(
        framework,
    )}?ref=${githubRef}`;
    return urlExists(url);
}

export function throwFrameworkNotFoundError(framework: string): void {
  console.error(
    `Could not locate a UI framework named ${chalk.red(`"${framework}"`)}.`,
  );
  process.exit(1);
}