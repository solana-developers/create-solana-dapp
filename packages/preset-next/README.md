# @solana-developers/preset-next

This library is a preset for [create-solana-dapp](https://npm.im/create-solana-dapp) that adds
[Next.js](https://nextjs.org/) support to your project.

## Supported generators

### next-application

```bash
NX   generate @solana-developers/preset-next:next-application [name] [options,...]

From:  @solana-developers/preset-next (v0.0.1)
Name:  next-application (aliases: application, preset)

  Generate a Next.js application

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

### next-template

```bash
NX   generate @solana-developers/preset-next:next-template [name] [options,...]

From:  @solana-developers/preset-next (v0.0.1)
Name:  next-template (aliases: template)

  Generate a Next.js template

Options:
    --directory                                                        [string]
    --name                                                             [string]
    --npmScope         The npm scope to use                            [string]
    --template         The template to use           [string] [choices: "base",
                                                            "none", "tailwind"]
    --webName          Name of the web application                     [string]
                       (overrides name)
    --anchor           Anchor template to use        [string] [choices: "none",
                                                            "counter", "basic"]
                                                              [default: "none"]
    --anchorName       Anchor project name         [string] [default: "anchor"]
    --anchorProgram    Anchor program name                             [string]
```

## More information

- [GitHub repository](https://github.com/solana-developers/create-solana-dapp)
- [npm package](https://npm.im/create-solana-dapp)
- [StackOverflow](https://solana.stackexchange.com/questions/tagged/create-solana-dapp)
