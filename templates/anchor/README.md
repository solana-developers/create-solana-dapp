# Anchor Solana Program

First run `anchor build` to build the program.
Then run `anchor keys sync` to update the program ID of the project.
```shell
anchor build
anchor keys sync
```

To deploy the program run `anchor deploy`.
```shell
anchor deploy
```

To run the tests, first install dependencies:
```shell
yarn install
yarn add ts-mocha
```

Next, run `anchor test` to run the test file.
```shell
anchor test
```

When running `anchor test` locally, Anchor will by default:
- start the local test validator
- build the program
- deploy the program to the local test validator
- run the test file
- stop the local test validator