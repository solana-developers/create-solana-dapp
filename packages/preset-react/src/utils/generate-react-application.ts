import { getProjects, Tree } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator as reactApplicationGenerator } from '@nx/react/src/generators/application/application'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export async function generateReactApplication(tree: Tree, options: NormalizedReactApplicationSchema) {
  await reactApplicationGenerator(tree, {
    name: options.webName,
    style: 'css',
    skipFormat: options.skipFormat,
    projectNameAndRootFormat: 'as-provided',
    unitTestRunner: 'none',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    pascalCaseFiles: false,
    classComponent: false,
    routing: true,
    strict: true,
    rootProject: false,
    bundler: 'webpack',
  })

  return getProjects(tree).get(options.webName)
}
