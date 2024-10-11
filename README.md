# create-solana-dapp

:zap: Get up and running fast with Solana dApps :zap:

Just run one simple command to generate a new project!

```shell
npx create-solana-dapp@latest
```

## Templates

The templates are supported within `create-solana-dapp`:

- Next.js
  - [Next.js + Tailwind CSS (no Anchor)](https://github.com/solana-developers/template-next-tailwind)
  - [Next.js + Tailwind CSS + Anchor Basic Example](https://github.com/solana-developers/template-next-tailwind-basic)
  - [Next.js + Tailwind CSS + Anchor Counter Example](https://github.com/solana-developers/template-next-tailwind-counter)
- React with Vite
  - [React with Vite + Tailwind CSS (no Anchor)](https://github.com/solana-developers/template-react-vite-tailwind)
  - [React with Vite + Tailwind CSS + Anchor Basic Example](https://github.com/solana-developers/template-react-vite-tailwind-basic)
  - [React with Vite + Tailwind CSS + Anchor Counter Example](https://github.com/solana-developers/template-react-vite-tailwind-counter)

## External templates

You can also use `create-solana-dapp` to create projects using external templates:

The `--template` (or `-t`) flag supports anything that [giget](https://github.com/unjs/giget) supports

```shell
pnpx create-solana-dapp --template <github-org>/<github-repo>
```

## Init script

Template authors can add an init script to the `package.json` file to help set up the project.

Use this script to return instructions to the user, check the `anchor` and `solana` versions, and replace text and files
in the project.

```json
{
  "name": "your-template",
  "create-solana-dapp": {
    // These instructions will be returned to the user after installation
    "instructions": [
      "Run Anchor commands:",
      // Adding a '+' will make the line bold and '{pm}' is replaced with the package manager
      "+{pm} run anchor build | test | localnet | deploy"
    ],
    // Rename is a map of terms to rename
    "rename": {
      // Rename every instance of counter
      "counter": {
        // With the name of the project
        "to": "{{name}}",
        // In the following paths
        "paths": ["anchor", "src"]
      }
    },
    // Check versions and give a warning if it's not installed or the version is lower
    "versions": {
      "anchor": "0.30.1",
      "solana": "1.18.0"
    }
  }
}
```

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
