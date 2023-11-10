import { Tree } from '@nx/devkit'
import { updateIgnoreEntries } from '@solana-developers/preset-common'

export function addAnchorIgnoreFields(tree: Tree, projectRoot: string) {
  const ignoreFiles = {
    git: [
      '.anchor',
      `${projectRoot}/target/deploy`,
      `${projectRoot}/target/release`,
      `${projectRoot}/target/sbf-solana-solana`,
      `${projectRoot}/target/.rustc_info.json`,
      `!${projectRoot}/target/idl/*.json`,
      `!${projectRoot}/target/types/*.ts`,
      'node_modules',
      'test-ledger',
      '.yarn',
    ],
    prettier: ['.anchor', 'target', 'node_modules', 'dist', 'tmp', 'build', 'test-ledger'],
  }

  updateIgnoreEntries(tree, '.gitignore', ignoreFiles.git)
  updateIgnoreEntries(tree, '.prettierignore', ignoreFiles.prettier)
}
