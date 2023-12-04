# @solana-developers/preset-anchor

This library is a preset for [create-solana-dapp](https://npm.im/create-solana-dapp) that adds
[Anchor](https://www.anchor-lang.com/) support to your project.

## Supported generators

### anchor-application

```bash
>  NX   generate @solana-developers/preset-anchor:anchor-application [name] [options,...]

From:  @solana-developers/preset-anchor (v0.0.1)
Name:  anchor-application (aliases: application, preset)

  Generate an Anchor application

Options:
    --name          Name of the application                             [string]
    --template      The template to use            [string] [choices: "counter",
                                                        "hello-world"] [default:
                                                                      "counter"]
    --skipFormat    Skip formatting files                              [boolean]
```

### anchor-template

```bash
>  NX   generate @solana-developers/preset-anchor:anchor-template [name] [options,...]

From:  @solana-developers/preset-anchor (v0.0.1)
Name:  anchor-template (aliases: template)

  Generate an Anchor template

Options:
    --directory                                                        [string]
    --name                                                             [string]
    --projectName          Name of the project                         [string]
    --template             The template to use       [string] [choices: "base",
                                                      "counter", "hello-world"]
    --skipUpdateIndexTs    Skip updating index.ts                     [boolean]
```

## More information

- [GitHub repository](https://github.com/solana-developers/create-solana-dapp)
- [npm package](https://npm.im/create-solana-dapp)
- [StackOverflow](https://solana.stackexchange.com/questions/tagged/create-solana-dapp)
