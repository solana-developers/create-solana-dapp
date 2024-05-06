# @solana-developers/preset-react

This library is a preset for [create-solana-dapp](https://npm.im/create-solana-dapp) that adds
[React](https://react.dev) support to your project.

## Supported generators

### react-application

```bash
NX   generate @solana-developers/preset-react:react-application [name] [options,...]

From:  @solana-developers/preset-react (v0.0.1)
Name:  react-application (aliases: application, preset)

  Generates a React application.

Options:
    --name             Name of the application                         [string]
    --anchor           Anchor template to use        [string] [choices: "none",
                                                            "counter", "basic"]
                                                           [default: "counter"]
    --anchorName       Anchor project name         [string] [default: "anchor"]
    --anchorProgram    Anchor program name                             [string]
    --port             Port to run the application     [number] [default: 3000]
                       on
    --ui               The UI library to use         [string] [choices: "none",
                                                          "tailwind"] [default:
                                                                    "tailwind"]
    --webName          Name of the web application                     [string]
                       (overrides name)
    --skipFormat       Skip formatting files                          [boolean]
```

### react-template

```bash
NX   generate @solana-developers/preset-react:react-template [name] [options,...]

From:  @solana-developers/preset-react (v0.0.1)
Name:  react-template (aliases: template)

  Generate React templates

Options:
    --directory                                                        [string]
    --name                                                             [string]
    --npmScope         The npm scope to use                            [string]
    --template         The template to use           [string] [choices: "base",
                                                     "none", "solana-provider",
                                                                    "tailwind"]
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

### react-feature

```bash
NX   generate @solana-developers/preset-react:react-feature [name] [options,...]

From:  @solana-developers/preset-react (v0.0.1)
Name:  react-feature (aliases: feature)

  undefined

Options:
    --name                                                              [string]
    --anchorName    Name of the Anchor project in   [string] [default: "anchor"]
                    the workspace
    --feature       The feature to generate                   [string] [choices:
                                                               "anchor-counter",
                                                         "anchor-basic", "none"]
    --npmScope      The npm scope to use                                [string]
    --ui            The UI library to use             [string] [choices: "none",
                                                           "tailwind"] [default:
                                                                     "tailwind"]
    --webName       Name of the Web project in the     [string] [default: "web"]
                    workspace
    --skipFormat    Skip formatting files                              [boolean]
```

## More information

- [GitHub repository](https://github.com/solana-developers/create-solana-dapp)
- [npm package](https://npm.im/create-solana-dapp)
- [StackOverflow](https://solana.stackexchange.com/questions/tagged/create-solana-dapp)
