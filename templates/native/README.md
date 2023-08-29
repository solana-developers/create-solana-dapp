# Native Solana Program

Start a local test validator by running:

```shell
solana-test-validator
```

Open a new terminal and run the following commands to build, deploy, and test
the program.

```shell
cd program
cargo build-bpf --bpf-out-dir=./solana

solana program deploy ./solana/<program_name>.so

yarn install

yarn run test
```
