# Maintaining create-solana-dapp

The document has a collection of information for the maintainers of this mono repo and the child packages contained
within.

## Publishing new versions

Normally, all the packages included within this repo are published together and should use the same specific version
number between all packages. This includes the primary `create-solana-dapp` CLI tool and the
`@solana-developers/preset-*` child packages. As such, all these packages are collectively referred to as
`create-solana-dapp` or `CSD` for short.

> Note: Your NPM cli must be logged into the NPM registry and have the correct permissions to publish a new version.

### `next` tag

The `next` tag is considered the beta/testing version of the `create-solana-dapp` tool, and the specific version will
normally include such a `beta` flag in it:

```shell
npx nx run-many --targets publish --tag next --ver x.x.x-beta.x
```

This will allow anyone to use the current beta/next version of the CLI using the following command:

```shell
npx create-solana-dapp@next
```

### `latest` tag

The `latest` tag is considered the production/stable version of the `create-solana-dapp` tool. To publish to the
`latest` tag:

```shell
npx nx run-many --targets publish --tag latest --ver x.x.x
```

This will allow anyone to use the current production/stable version of the CLI using the following command:

```shell
npx create-solana-dapp@latest
```

### Set a tagged version to a specific published version

In the case we need to set the specific version associated with `create-solana-dapp` and child packages (e.g. rolling
back the `latest` tag to a previous version) you can run the `dist-tag` target via NX on any of the CSD packages in this
monorepo.

#### All child packages

To force all child packages to have a specific tag with a specific published version:

```shell
npx nx run-many --targets dist-tag --tag next --ver x.x.x
```

#### Single child package

To set a specific child package's tag to be a specific published version:

```shell
# `next` tag
npx nx run solana-dev:dist-tag --tag next --ver x.x.x
```

```shell
# `latest` tag
npx nx run solana-dev:dist-tag --tag latest --ver x.x.x
```
