import chalk from "chalk";

import { 
    validateProgramFramework, 
    validateUiFramework, 
    throwFrameworkNotFoundError
 } from './helpers/framework';
 import {
    defaultUiFramework,
    defaultProgramFramework,
 } from './helpers/constants';


export async function createSolanaDapp({
    dappPath,
    framework,
    program,
}: {
    dappPath: string;
    framework?: string;
    program?: string;
}): Promise<void> {

    console.log();
    console.log(`Creating Solana dApp: ${dappPath}`);
    console.log();

    if (framework) {
        const validUiFramework: boolean = await validateUiFramework(framework);
        if (!validUiFramework) {
            throwFrameworkNotFoundError(framework, "UI");
        }
    } else {
        framework = defaultUiFramework;
    }
    if (program) {
        const validProgramFramework: boolean = await validateProgramFramework(program);
        if (!validProgramFramework) {
            throwFrameworkNotFoundError(program, "program");
        }
    } else {
        program = defaultProgramFramework;
    }
    
    console.log(`${chalk.magentaBright("UI Framework      : ")} ${framework}`);
    console.log(`${chalk.magentaBright("Program Framework : ")} ${program}`);
    console.log();
    console.log("Building...");
    console.log();
}