import { addDependenciesToPackageJson, ProjectConfiguration, Tree, updateJson } from '@nx/devkit'
import { packageVersion } from '@solana-developers/preset-common'
import { join } from 'path'

export function anchorApplicationDependencies(tree: Tree, project: ProjectConfiguration) {
  const dependencies = {
    '@coral-xyz/anchor': packageVersion['@coral-xyz'].anchor,
    '@solana/web3.js': packageVersion['@solana']['web3.js'],
  }

  // Add the dependencies to the package.json in the workspace root
  addDependenciesToPackageJson(tree, dependencies, {})
  // Add the dependencies to the package.json in the project root
  updateJson(tree, join(project.root, 'package.json'), (json) => {
    json.dependencies = dependencies
    return json
  })
}
