# Native Solana Program

```shell
cd program
cargo build-bpf --bpf-out-dir=./solana

solana program deploy ./solana/program.so

yarn install

yarn run test
```