import chalk from "chalk";
import path from "path";
import fs from "fs";
import fsExtra from "fs-extra";

import {
    defaultUiFramework,
    defaultProgramFramework
} from './helpers/constants';
import { 
    downloadFiles, 
    validateFramework
} from './helpers/framework';
import {
    shouldUseGit, 
    tryGitInit
} from './helpers/git';
import {
    shouldUseSolana
} from './helpers/solana';
import { 
    renderProgramTemplates
} from './helpers/template';
import { 
    installDeps, 
    shouldUseYarn, 
    shouldUseYarnWorkspaces 
} from './helpers/yarn';


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

    const root: string = path.resolve(dappPath);
    const dappName: string = path.basename(root);
    const originalDirectory: string = process.cwd();

    if (framework) {
        await validateFramework(framework, "UI");
    } else {
        framework = defaultUiFramework;
    };
    if (program) {
        await validateFramework(program, "program");
    } else {
        program = defaultProgramFramework;
    };

    console.log(`${chalk.magentaBright("    UI Framework      : ")} ${framework}`);
    console.log(`${chalk.magentaBright("    Program Framework : ")} ${program}`);
    console.log();

    if (fs.existsSync(root)) {
        console.log();
        console.error(`${chalk.redBright("Error:")} directory exists: ${root}`);
        console.log();
        process.exit(1);
    }

    console.log("Building...");
    console.log();
    await fsExtra.ensureDir(root);
    await fsExtra.ensureDir(root + "/app");
    await fsExtra.ensureDir(root + "/temp"); // program dir is created during clone step
    
    shouldUseSolana();
    shouldUseGit();
    shouldUseYarn();
    shouldUseYarnWorkspaces();

    console.log("Downloading templates...");
    console.log();
    await downloadFiles(framework, program, root, dappName);

    console.log("Extracting...");
    console.log();
    renderProgramTemplates(root, dappName, program);

    console.log(`Installing dependencies for ${chalk.magentaBright(framework)} UI framework...`);
    console.log();
    await installDeps(root + "/app");

    console.log(`Installing dependencies for ${chalk.magentaBright(program)} program framework...`);
    console.log();
    await installDeps(root + "/program");

    console.log("Initializing git...");
    console.log();
    if (tryGitInit(root)) {
        console.log("Initialized new git repository.");
        console.log();
    };

    console.log(`${chalk.greenBright("  Done!")}`);
    console.log();
    console.log(`Successfully created Solana dApp: ${chalk.greenBright(dappName)}!`);
    console.log();
    console.log(`${chalk.magentaBright("  Happy dApp Hacking!")}`);
}