# Maintaining create-solana-dapp

The document has information for the maintainers of this package.

## Publishing new versions

> Note: Your NPM cli must be logged into the NPM registry and have the correct permissions to publish a new version.

### `next` tag

The `next` tag is considered the beta/testing version of the `create-solana-dapp` tool, and the specific version will
normally include such a `beta` flag in it:

```shell
pnpm version <x.y.z>
pnpm release:next
```

This will allow anyone to use the current beta/next version of the CLI using the following command:

```shell
pnpx create-solana-dapp@next
# Or use: npx create-solana-dapp@next / Yarn sadly can't do this with arbitrary tags.
```

### `latest` tag

The `latest` tag is considered the production/stable version of the `create-solana-dapp` tool. To publish to the
`latest` tag:

```shell
pnpm version <x.y.z>
pnpm release
```

This will allow anyone to use the current production/stable version of the CLI using the following command:

```shell
pnpx create-solana-dapp@latest
# Or use: npx create-solana-dapp@latest / yarn create solana-dapp
```
