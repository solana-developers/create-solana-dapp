# create-solana-dapp

:zap: Get up and running fast with Solana dApps :zap:

Just run one simple command to generate a new project!

```shell
npx create-solana-dapp@latest
```

## Supported UI frameworks

The following UI frameworks are supported within `create-solana-dapp`:

- Next.js
  - [Next.js + Tailwind CSS (no Anchor)](https://github.com/solana-developers/template-next-tailwind)
  - [Next.js + Tailwind CSS + Anchor Basic Example](https://github.com/solana-developers/template-next-tailwind-basic)
  - [Next.js + Tailwind CSS + Anchor Counter Example](https://github.com/solana-developers/template-next-tailwind-counter)
- React with Vite
  - [React with Vite + Tailwind CSS (no Anchor)](https://github.com/solana-developers/template-react-vite-tailwind)
  - [React with Vite + Tailwind CSS + Anchor Basic Example](https://github.com/solana-developers/template-react-vite-tailwind-basic)
  - [React with Vite + Tailwind CSS + Anchor Counter Example](https://github.com/solana-developers/template-react-vite-tailwind-counter)

### Planned frameworks to support

The following UI frameworks are planned and expected to be supported in the future:

- VueJS
- Svelte
- React Native

## Supported on-chain program frameworks

The following on-chain programs (aka smart contracts) frameworks are supported within `create-solana-dapp`:

- Anchor

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
pnpm build
```

```

Detailed instructions on the local development workflow are outlined in the
[Development Workflow](./CONTRIBUTING.md#development-workflow) section of the CONTRIBUTING guidelines.
```
