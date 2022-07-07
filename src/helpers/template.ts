import { getSolanaConfigKeypair } from "./solana";


export async function renderProgramTemplates(
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
    // REPLACE:
    //  {{ dapp_name }}         :   dappName
    //  {{ dapp_name_snake }}   :   snakeCase(dappName)
}

function snakeCase(dappName: string): string {
    return dappName.replace('-', '_');
}

function getAnchorTemplateFiles(dappName: string): string[] {
    return [
        `/programs/${dappName}/Cargo.toml`,
        `/programs/${dappName}/src/lib.rs`,
        `/tests/${dappName}.ts`,
        `Anchor.toml`
    ];
}

function getNativeTemplateFiles(): string[] {
    return [
        `/program/Cargo.toml`,
        `/tests/test.ts`
    ];
}