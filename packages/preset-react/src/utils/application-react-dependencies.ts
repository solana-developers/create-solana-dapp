import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { NormalizedApplicationReactSchema } from '../generators/application/application-react-schema'
import { getUiDependencies } from './get-ui-dependencies'

export function applicationReactDependencies(tree: Tree, options: NormalizedApplicationReactSchema) {
  const { dependencies, devDependencies } = getUiDependencies(options.uiLibrary)

  return addDependenciesToPackageJson(tree, dependencies ?? {}, devDependencies ?? {})
}
