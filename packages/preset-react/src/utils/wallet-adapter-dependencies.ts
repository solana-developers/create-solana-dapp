import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@solana-developers/preset-common'

export function walletAdapterDependencies(tree: Tree) {
  return addDependenciesToPackageJson(
    tree,
    {
      '@solana/wallet-adapter-base': packageVersion['@solana']['wallet-adapter-base'],
      '@solana/wallet-adapter-react': packageVersion['@solana']['wallet-adapter-react'],
      '@solana/wallet-adapter-react-ui': packageVersion['@solana']['wallet-adapter-react-ui'],
      '@solana/wallet-adapter-solflare': packageVersion['@solana']['wallet-adapter-solflare'],
      '@solana/wallet-adapter-unsafe-burner': packageVersion['@solana']['wallet-adapter-unsafe-burner'],
      '@solana/web3.js': packageVersion['@solana']['web3.js'],
      bs58: packageVersion.bs58,
    },
    {},
  )
}
