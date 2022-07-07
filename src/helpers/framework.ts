import axios from "axios";
import chalk from "chalk";
import urlExists from "url-exist";

import { 
    githubApiBaseUrl, 
    githubUiRepository, 
    githubUiRef, 
    githubProgramRepository, 
    githubProgramRef, 
    programFrameworksList, 
    uiFrameworksList, 
} from "./constants";
import { cloneUi, cloneProgram } from './git';


export async function downloadFiles(framework: string, program: string, root: string) {
    await downloadUiFramework(framework, root);
    await downloadProgramFramework(program, root);
}

export async function validateFramework(framework: string, type: string): Promise<void> {
    let supported: string[] = [];
    let url: string = "";
    if (type === "program") {
        supported = programFrameworksList;
        url = programFrameworkUrl(framework);
    } else {
        supported = uiFrameworksList;
        url = uiFrameworkUrl(framework);
    };
    if (!supported.some(x => x === framework)) {
        throwUnsupportedFrameworkError(framework, type, supported);
    };
    if (!(await urlExists(url))) {
        throwFrameworkNotFoundError(framework, type);
    };
    console.log(url);
}

function uiFrameworkUrl(framework: string, filePath?: string): string {
    return `${githubApiBaseUrl}/${githubUiRepository}-${encodeURIComponent(
        framework,
    )}${filePath ? "/contents/" + filePath : ""}?ref=${githubUiRef}`;
}

function programFrameworkUrl(program: string, filePath?: string): string {
    return `${githubApiBaseUrl}/${githubProgramRepository}/${encodeURIComponent(
        program,
    )}${filePath ? "/" + filePath : ""}?ref=${githubProgramRef}`;
}

function throwUnsupportedFrameworkError(framework: string, type: string, supported: string[]): void {
    console.error(
        `Unsupported ${type} framework: ${chalk.red(`"${framework}"`)}.`,
    );
    console.log(
        `   Supported ${type} frameworks: ${chalk.greenBright(supported)}`
    );
    console.log();
    process.exit(1);
}

function throwFrameworkNotFoundError(framework: string, type: string): void {
    console.error(
      `Could not locate ${type} framework: ${chalk.red(`"${framework}"`)}.`,
    );
    process.exit(1);
}

async function downloadUiFramework(framework: string, root: string) {
    let url = uiFrameworkUrl(framework, "README.md");
    await cloneUi(framework, root);
}

async function downloadProgramFramework(program: string, root: string) {
    let url = programFrameworkUrl(program, "README.md");
    await cloneProgram(program, root);
}