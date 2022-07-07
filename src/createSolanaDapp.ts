import { 
    hasProgramFramework, 
    hasUiFramework, 
    throwFrameworkNotFoundError
 } from './helpers/framework';


export async function createSolanaDapp({
    dappPath,
    framework,
    program,
}: {
    dappPath: string;
    framework?: string;
    program?: string;
}): Promise<void> {

    console.log(`Creating Solana dApp: ${dappPath}`);

    if (framework) {
        const foundUiFramework: boolean = await hasUiFramework(framework);
        const foundProgramFramework: boolean = await hasProgramFramework(framework);
        if (!foundUiFramework || !foundProgramFramework) {
            throwFrameworkNotFoundError(framework);
        }
    } else {
        framework = "react";
    }
}