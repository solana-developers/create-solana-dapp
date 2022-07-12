
// export const uiFrameworksList: string[] = ["next", "vue", "svelte"];
export const uiFrameworksList: string[] = ["next", "vue"];
export const defaultUiFramework: string = "next";
export const programFrameworksList: string[] = ["anchor", "native"];
export const defaultProgramFramework: string = "anchor";

export const githubApiUrlMap = new Map<string, string>([
    ["next", "https://api.github.com/repos/solana-developers/solana-dapp-next?ref=main"],
    ["vue", "https://api.github.com/repos/solana-developers/dapp-scaffold-vue?ref=main"],
    // ["svelte", "https://api.github.com/repos/solana-developers/dapp-scaffold-svelte?ref=main"],
    ["anchor", "https://api.github.com/repos/solana-developers/create-solana-app/contents/templates/anchor?ref=main"],
    ["native", "https://api.github.com/repos/solana-developers/create-solana-app/contents/templates/native?ref=main"],
]);

export const githubCloneUrlMap = new Map<string, string>([
    ["next", "https://github.com/solana-developers/solana-dapp-next.git"],
    ["vue", "https://github.com/solana-developers/dapp-scaffold-vue.git"],
    // ["svelte", "https://github.com/solana-developers/dapp-scaffold-svelte.git"],
    ["anchor", "https://github.com/solana-developers/create-solana-app.git"],
    ["native", "https://github.com/solana-developers/create-solana-app.git"],
]);
