import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@solana-developers/preset-common'

export function applicationAnchorDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      '@coral-xyz/anchor': packageVersion['@coral-xyz'].anchor,
    },
    {},
  )
}
