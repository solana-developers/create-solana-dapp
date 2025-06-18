---
'create-solana-dapp': minor
---

Add CLI version check functionality

- Add new `checkCliVersion` function to check if the current CLI version is outdated
- Implement version warning messages with upgrade instructions for multiple package managers
- Add support for blocking execution on severely outdated versions
- Include `--skip-version-check` flag option in warning messages
- Add comprehensive error handling and verbose logging options
