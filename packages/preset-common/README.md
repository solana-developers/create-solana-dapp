# @solana-developers/preset-common

This library is a preset for [create-solana-dapp](https://npm.im/create-solana-dapp) with shared code for the other
presets.

## Supported generators

### common-template

```bash
NX   generate @solana-developers/preset-common:common-template [name] [options,...]

From:  @solana-developers/preset-common (v0.0.1)
Name:  common-template

  Generate Common templates

Options:
    --directory                                                        [string]
    --name                                                             [string]
    --npmScope         The npm scope to use                            [string]
    --template         The template to use                   [string] [choices:
                                                           "license", "readme"]
    --webName          Name of the web application                     [string]
                       (overrides name)
    --anchor           Anchor template to use        [string] [choices: "none",
                                                            "counter", "basic"]
                                                              [default: "none"]
    --anchorName       Anchor project name         [string] [default: "anchor"]
    --anchorProgram    Anchor program name                             [string]
    --licenseAuthor    The author to use in the                        [string]
                       license
    --preset           The preset to use             [string] [choices: "next",
                                                                       "react"]
```

## More information

- [GitHub repository](https://github.com/solana-developers/create-solana-dapp)
- [npm package](https://npm.im/create-solana-dapp)
- [StackOverflow](https://solana.stackexchange.com/questions/tagged/create-solana-dapp)
