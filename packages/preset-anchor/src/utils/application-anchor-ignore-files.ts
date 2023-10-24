import { Tree } from '@nx/devkit'
import { updateIgnoreEntries } from '@solana-developers/preset-common'

export function addAnchorIgnoreFields(tree: Tree) {
  const ignoreFiles = {
    git: ['.anchor', '.DS_Store', 'target', '**/*.rs.bk', 'node_modules', 'test-ledger', '.yarn'],
    prettier: ['.anchor', '.DS_Store', 'target', 'node_modules', 'dist', 'build', 'test-ledger'],
  }

  updateIgnoreEntries(tree, '.gitignore', ignoreFiles.git)
  updateIgnoreEntries(tree, '.prettierignore', ignoreFiles.prettier)
}
