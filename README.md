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

The following on-chain programs (aka smart contracts) frameworks are supported within `create-solana-dapp`:

- Anchor

## Packages

This projects operates as an NX monorepo that requires each of the child packages deployed to the NPM package registry:

- [create-solana-dapp](./packages/create-solana-dapp): The CLI tool that generates a new project.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more info.

## Local development

> [!TIP] This project uses [pnpm](https://pnpm.io/) as the package manager. If you don't have it, you can install it
> using `corepack`:
>
> ```sh
> corepack enable
> corepack prepare pnpm@9 --activate
> ```

To install the project locally, run the following commands:

```shell
git clone https://github.com/solana-developers/create-solana-dapp.git
cd create-solana-dapp
pnpm install
pnpm run build
```

### Local registry

The `create-solana-dapp` CLI uses a local registry to publish packages to.

```

Detailed instructions on the local development workflow are outlined in the
[Development Workflow](./CONTRIBUTING.md#development-workflow) section of the CONTRIBUTING guidelines.
```
