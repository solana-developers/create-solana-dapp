import fs from "fs";
import nunjucks from "nunjucks";
import { getSolanaConfigKeypair } from "./solana";


export async function renderProgramTemplates(
    root: string,
    dappName: string,
    program: string,
): Promise<void> {
    let templateFiles: string[] = [];
    if (program === "native") {
        templateFiles = getNativeTemplateFiles();
    } else {
        templateFiles = getAnchorTemplateFiles(dappName);
    };
    const solanaKeypair = getSolanaConfigKeypair();
    for (var file of templateFiles) {
        const path = root + file;
        const contents = nunjucks.render(
            path, 
            {
                dapp_name: dappName,
                dapp_name_snake: snakeCase(dappName),
                dapp_name_camel_upper: camelCaseWithFirstUpper(dappName),
                solana_wallet: solanaKeypair,
            }
        );
        fs.writeFileSync(path, contents);
    };
}

function snakeCase(dappName: string): string {
    return dappName.replace('-', '_');
}

function camelCaseWithFirstUpper(dappName: string): string {
    let splitArray = dappName.split('-');
    let result = "";
    for (var word of splitArray) {
        result += word.replace(word.charAt(0), word.charAt(0).toUpperCase());
    };
    return result;
}

function getAnchorTemplateFiles(dappName: string): string[] {
    return [
        `/program/programs/${dappName}/Cargo.toml`,
        `/program/programs/${dappName}/src/lib.rs`,
        `/program/tests/${dappName}.ts`,
        `/program/Anchor.toml`,
        `/README.md`
    ];
}

function getNativeTemplateFiles(): string[] {
    return [
        `/program/program/Cargo.toml`,
        `/program/tests/test.ts`,
        `/README.md`
    ];
}