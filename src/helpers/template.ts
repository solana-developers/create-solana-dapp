

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