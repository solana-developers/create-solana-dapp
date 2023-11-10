import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { getUiDependencies } from './get-ui-dependencies'
import { NormalizedApplicationReactSchema } from './normalize-application-react-schema'

export function applicationReactDependencies(tree: Tree, options: NormalizedApplicationReactSchema) {
  const { dependencies, devDependencies } = getUiDependencies(options.ui)

  return addDependenciesToPackageJson(tree, dependencies ?? {}, devDependencies ?? {})
}
