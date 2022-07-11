import chalk from "chalk";
import { execSync } from "child_process";


export function shouldUseSolana(): void {
    try {
      execSync("solana --version", { stdio: "ignore" });
    } catch (error) {
      console.error(`${chalk.greenBright("solana-cli")} is necessary for ${chalk.magentaBright("create-solana-dapp")}. Install via the official documentation:`);
      console.log();
      console.log(chalk.greenBright("  https://docs.solana.com/cli/install-solana-cli-tools"));
      process.exit(1);
    }
  }

export function getSolanaConfigKeypair(): string | undefined {
    const config: string = execSync("solana config get").toString();
    let keypairMatch = /Keypair Path: .*.json/.exec(config);
    if (keypairMatch) {
        return keypairMatch[0].replace(/Keypair Path: /, '');
    } else {
        throwKeypairNotFoundError();
    };
}

function throwKeypairNotFoundError(): void {
    console.error("Could not locate local Solana keypair. Did you create one?");
    console.log(`   ${chalk.cyanBright("solana-keygen new")}`);
    process.exit(1);
}