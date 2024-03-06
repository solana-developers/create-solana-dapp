import { Tree } from '@nx/devkit'
import { updateIgnoreEntries } from '@solana-developers/preset-common'

export function anchorApplicationIgnoreFiles(tree: Tree, projectRoot: string) {
  const anchorIgnore = [
    '.anchor',
    `${projectRoot}/target/deploy`,
    `${projectRoot}/target/debug`,
    `${projectRoot}/target/release`,
    `${projectRoot}/target/sbf-solana-solana`,
    `${projectRoot}/target/.rustc_info.json`,
    `!${projectRoot}/target/idl/*.json`,
    `!${projectRoot}/target/types/*.ts`,
  ]
  const ignoreFiles = {
    git: [...anchorIgnore, 'node_modules', 'test-ledger', '.yarn'],
    prettier: [...anchorIgnore, 'node_modules', 'dist', 'tmp', 'build', 'test-ledger'],
  }

  updateIgnoreEntries(tree, '.gitignore', ignoreFiles.git)
  updateIgnoreEntries(tree, '.prettierignore', ignoreFiles.prettier)
}
