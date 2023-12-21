# create-solana-dapp

:zap: Get up and running fast with Solana dApps :zap:

Just run one simple command to generate a new project!

```shell
npx create-solana-dapp@latest
```

## Supported UI frameworks

The following UI frameworks are supported within `create-solana-dapp`:

- ReactJS
- NextJS

### Planned frameworks to support

The following UI frameworks are planned and expected to be supported in the future:

- VueJS
- Svelte
- React Native

## Supported onchain program frameworks

The following onchain programs (aka smart contract) frameworks are supported within `create-solana-dapp`:

- Anchor

## Packages

This projects operates as an NX monorepo that requires each of the child packages deployed to the NPM package registry:

- [create-solana-dapp](./packages/create-solana-dapp): The CLI tool that generates a new project.
- [preset-anchor](./packages/preset-anchor): A preset for [create-solana-dapp](./packages/create-solana-dapp) that adds
  [Anchor](https://www.anchor-lang.com) support.
- [preset-common](./packages/preset-common): Shared utilities for [create-solana-dapp](./packages/create-solana-dapp)
  presets.
- [preset-next](./packages/preset-next): A preset for [create-solana-dapp](./packages/create-solana-dapp) that adds
  [Next.js](https://nextjs.org) support.
- [preset-react](./packages/preset-react): A preset for [create-solana-dapp](./packages/create-solana-dapp) that adds
  [React](https://reactjs.org) support.
- [solana-dev](./packages/solana-dev): A CLI tool that with utilities for developing Solana dApps.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more info.

## Local development

Detailed instructions on the local development workflow are outlined in the
[Development Workflow](./CONTRIBUTING.md#development-workflow) section of the CONTRIBUTING guidelines.
