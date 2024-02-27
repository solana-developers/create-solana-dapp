import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@solana-developers/preset-common'

export function walletAdapterDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      '@solana/spl-token': packageVersion['@solana']['spl-token'],
      '@solana/wallet-adapter-base': packageVersion['@solana']['wallet-adapter-base'],
      '@solana/wallet-adapter-react': packageVersion['@solana']['wallet-adapter-react'],
      '@solana/wallet-adapter-react-ui': packageVersion['@solana']['wallet-adapter-react-ui'],
      '@solana/web3.js': packageVersion['@solana']['web3.js'],
      bs58: packageVersion.bs58,
      buffer: packageVersion.buffer,
    },
    {},
  )
}
