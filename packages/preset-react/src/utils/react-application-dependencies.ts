import { addDependenciesToPackageJson, Tree } from '@nx/devkit'
import { packageVersion } from '@solana-developers/preset-common'
import { getUiDependencies } from './get-ui-dependencies'
import { NormalizedReactApplicationSchema, ReactPreset } from './normalize-react-application-schema'

export function reactApplicationDependencies(
  tree: Tree,
  options: NormalizedReactApplicationSchema,
  preset: ReactPreset,
) {
  const { dependencies: uiDependencies, devDependencies: uiDevDependencies } = getUiDependencies(options.ui)

  const dependencies = {
    ...uiDependencies,
  }
  const devDependencies = {
    ...uiDevDependencies,
  }
  if (preset === 'next') {
    dependencies['@tanstack/react-query-next-experimental'] =
      packageVersion['@tanstack']['react-query-next-experimental']
    dependencies.encoding = packageVersion.encoding
  }
  if (preset === 'react') {
    dependencies['crypto-browserify'] = packageVersion['crypto-browserify']
    dependencies['stream-browserify'] = packageVersion['stream-browserify']
  }

  return addDependenciesToPackageJson(tree, dependencies ?? {}, devDependencies ?? {})
}
