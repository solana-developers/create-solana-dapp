
export const uiFrameworksList: string[] = ["next", "vue"];
export const defaultUiFramework: string = "next";
export const programFrameworksList: string[] = ["anchor", "native"];
export const defaultProgramFramework: string = "anchor";

export const githubApiUrlMap = new Map<string, string>([
    ["next", "https://api.github.com/repos/solana-developers/solana-dapp-next?ref=main"],
    ["vue", "https://api.github.com/repos/solana-developers/dapp-scaffold-vue?ref=main"],
    ["anchor", "https://api.github.com/repos/jpcaulfi/create-solana-dapp/contents/templates/anchor?ref=master"],
    ["native", "https://api.github.com/repos/jpcaulfi/create-solana-dapp/contents/templates/native?ref=master"],
]);

export const githubCloneUrlMap = new Map<string, string>([
    ["next", "https://github.com/solana-developers/solana-dapp-next.git"],
    ["vue", "https://github.com/solana-developers/dapp-scaffold-vue.git"],
    ["anchor", "https://github.com/jpcaulfi/create-solana-dapp.git"],
    ["native", "https://github.com/jpcaulfi/create-solana-dapp.git"],
]);