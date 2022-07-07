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
        let contents = nunjucks.render(
            path, 
            {
                dap_name: dappName,
                dap_name_snake: snakeCase(dappName),
                dap_name_camel: camelCase(dappName),
                dap_name_camel_upper: camelCaseWithFirstUpper(dappName),
                solana_wallet: solanaKeypair,
            }
        );
        fs.writeFileSync(path, contents);
    };
}

function snakeCase(dappName: string): string {
    return dappName.replace('-', '_');
}

function camelCase(dappName: string): string {
    return dappName.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      }).replace(/\s+/g, '');
}

function camelCaseWithFirstUpper(dappName: string): string {
    let camel = camelCase(dappName);
    return camel.replace(camel.charAt(0), camel.charAt(0).toUpperCase());
}

function getAnchorTemplateFiles(dappName: string): string[] {
    return [
        `/program/programs/${dappName}/Cargo.toml`,
        `/program/programs/${dappName}/src/lib.rs`,
        `/program/tests/${dappName}.ts`,
        `/program/Anchor.toml.njk`,
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