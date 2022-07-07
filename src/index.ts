#!/usr/bin/env node
import chalk from "chalk";
import Commander from "commander";
import path from "path";

import packageJson from "../package.json";
import { createSolanaDapp } from './createSolanaDapp';
import { validatePkgName } from './helpers/npm';



let projectPath: string = "";


function printDirectoryInstructions() {
    console.log();
    console.log(`${chalk.redBright("Error:")} Please specify the project directory:`);
    console.log();
    console.log(`  create-solana-dapp ${chalk.greenBright("<project-directory>")}`);
    console.log();
    console.log();
    console.log("For example:");
    console.log();
    console.log(`  create-solana-dapp ${chalk.greenBright("my-solana-dapp")}`);
    console.log();
    console.log(`Run ${chalk.magentaBright(`create-solana-dapp --help`)} to see all options.`);
    console.log();
    process.exit(1);
}


const program: Commander.Command = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} ${chalk.yellowBright("[options]")}`)
  .action(function (name: string) {
    projectPath = name;
  })
  .option(
    `-f, --framework ${chalk.magentaBright("<name>")}`,
    `
  UI framework:                     [ Next | Vue ]          ${chalk.magentaBright("Default:")} [ Next ]
`,
  )
  .option(
    `-p, --program ${chalk.magentaBright("<name>")}`,
    `
  Program development framework:    [ Anchor | Native ]     ${chalk.magentaBright("Default:")} [ Anchor ] 
`,
  )
  .exitOverride(function () {
    printDirectoryInstructions();
  })
  .parse(process.argv);
  

async function run(): Promise<void> {

    if (typeof projectPath === "string") {
        projectPath = projectPath.trim();
    };
    
    if (!projectPath) {
        printDirectoryInstructions();
    };
    
    const resolvedProjectPath = path.resolve(projectPath);
    const projectName = path.basename(resolvedProjectPath);
    
    const { problems, valid } = validatePkgName(projectName);

    if (!valid) {
        console.error(
            `${chalk.redBright("Could not create project:")} ${projectName} ${chalk.redBright(" : ")} violates npm naming restrictions.`,
        );
        if (problems) {
            problems.forEach(function (problem: string) {
                return console.error(`    ${chalk.red.bold("*")} ${problem}`);
            });
        }
        process.exit(1);
    };
    
    const options = program.opts();
    await createSolanaDapp({
        dappPath: resolvedProjectPath,
        framework: (typeof options.framework === "string" && options.framework.trim()) || undefined,
        program: (typeof options.program === "string" && options.program.trim()) || undefined,
    });
}


run()
.catch(async function (reason) {
    {
        console.log();
        console.log("Aborting...");
        if (reason.command) {
            console.log(`  ${chalk.cyan(reason.command)} has failed.`);
        } else {
            console.log(chalk.red("Unexpected error:"));
            console.log(reason);
        }
        process.exit(1);
    }
});