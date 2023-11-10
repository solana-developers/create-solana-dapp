# Contributing to create-solana-dapp

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## We Develop with GitHub

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## We use [GitHub Flow](https://guides.github.com/introduction/flow/index.html), so all code changes happen through pull requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same
[MIT License](https://choosealicense.com/licenses/mit/) that covers the project.

## Report bugs using GitHub's [issues](https://github.com/solana-developers/create-solana-dapp/issues)

We use GitHub issues to track public bugs. Report a bug by
[opening a new issue](https://github.com/solana-developers/create-solana-dapp/issues/new); it's that easy!

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

People _love_ thorough bug reports.

## Use a Consistent Coding Style

- 2 spaces for indentation rather than tabs
- You can try running `npm run lint` for style unification

## Development Workflow

In this section, you'll find the basic commands you need to run for building, testing, and maintaining the quality of
the codebase.

This project is structured within an Nx Workspace, providing powerful tools and capabilities to enhance development
practices. For more information, see the [Nx Documentation](https://nx.dev/).

### Repo structure

The project is structured as a monorepo, with each package in the `packages` directory.

To view the list of packages, run:

```shell
yarn nx show projects
```

The e2e tests are located in the `e2e` directory.

### Nx Cache

Nx uses a cache to speed up development. If you want to bypass the cache, you can use the `--skip-nx-cache` flag:

```shell
yarn nx build create-solana-dapp --skip-nx-cache
```

### Building the Project

To compile the project and generate the necessary artifacts, use the build command:

```shell
yarn build
```

To build an individual package, invoke the `nx build` command with the project name:

```shell
yarn nx build create-solana-dapp
```

You can build the project in watch mode by appending the `--watch` flag for faster feedback:

```shell
yarn nx build create-solana-dapp --watch
```

### Running Tests

To ensure your contributions do not break any existing functionality, run the test suite with the following command:

```shell
yarn test
```

To run the tests for a specific package, invoke the `nx test` command with the project name:

```shell
yarn nx test preset-react
```

You can run the tests in watch mode by appending the `--watch` flag for faster feedback:

```shell
yarn nx test preset-react --watch
```

### Linting Your Code

It's important to maintain the coding standards of the project. Lint your code by executing:

```shell
yarn lint
```

To lint a specific package, invoke the `nx lint` command with the project name:

```shell
yarn nx lint preset-react
```

### Working on the CLI

If you want to quickly test your changes to the CLI, you can do the following:

#### create-solana-dapp

Run the build in watch mode in one terminal:

```shell
yarn nx build create-solana-dapp --watch
```

In another terminal, move to the directory where you want to test the `create-solana-dapp` CLI and run by invoking the
`node` command with the path to the compiled CLI:

```shell
cd /tmp
node ~/path/to/create-solana-dapp/dist/packages/create-solana-dapp/bin/index.js --help
```

#### solana-dev

The same goes for the `solana-dev` CLI:

```shell
# In one terminal
yarn nx build solana-dev --watch
# In another terminal
cd /tmp
node ~/path/to/create-solana-dapp/dist/packages/solana-dev/bin/index.js --help
```

### Publishing to a local registry

If you want to test your changes to the CLI in a local registry, you can do the following:

Start the local registry:

```shell
yarn local-registry
```

In another terminal, run the following command to publish the packages to the local registry:

```shell
npx nx run-many --targets publish --ver <your-version> --tag local
```

Note: This will publish all the packages to the local registry with the `local` tag. Therefore, to utilize any of these
packages from your local registry, you must specify using this same `local` tag on the packages (e.g.
`create-solana-dapp@local`).

Once that's done, with the local registry still running, you can run the `create-solana-dapp` CLI by invoking the
following command:

```shell
npx create-solana-dapp@local
```

For example, this one-liner will create a new app with the latest version of the `create-solana-dapp` CLI using the
React preset and yarn as the package manager:

```shell
 npx --yes create-solana-dapp@local app-"$(date +%s)" --preset react --package-manager yarn
```

To check all the options, run:

```shell
npx create-solana-dapp@local --help
```

The local registry will be running at http://localhost:4873 and in order to use it, changes to the `~/.npmrc` file are
required. The local-registry script will do this for you, but it might fail to clean up after itself. If you run into
any issues, try removing the following lines from your `~/.npmrc` file:

```shell
registry=http://localhost:4873/
//localhost:4873/:_authToken=secretVerdaccioToken
```

and replace them with:

```shell
registry=https://registry.npmjs.org/
```

### E2E Testing

To run the e2e tests, use the following command:

```shell
yarn nx e2e preset-react-e2e
```

This will spin up a local registry, publish a package with the e2e tag, and run the e2e tests.

### Committing Your Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for commit:

- `fix`: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
- `feat`: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic
  versioning).
- `BREAKING CHANGE`: a commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section
  introduces a breaking API change (correlating with MAJOR in semantic versioning). A BREAKING CHANGE can be part of
  commits of any type.
- Others: commit types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the
  Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

## References

This document was adapted from the open-source contribution guidelines for
[Facebook's Draft](https://github.com/facebook/draft-js/blob/master/CONTRIBUTING.md)
