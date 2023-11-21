import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { getUiDependencies } from './get-ui-dependencies'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export function reactApplicationDependencies(tree: Tree, options: NormalizedReactApplicationSchema) {
  const { dependencies, devDependencies } = getUiDependencies(options.ui)

  return addDependenciesToPackageJson(tree, dependencies ?? {}, devDependencies ?? {})
}
