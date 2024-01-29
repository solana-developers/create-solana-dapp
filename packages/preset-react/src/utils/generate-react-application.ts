import { getProjects, Tree, updateJson } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator as reactApplicationGenerator } from '@nx/react/src/generators/application/application'
import { join } from 'path'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export async function generateReactApplication(tree: Tree, options: NormalizedReactApplicationSchema) {
  await reactApplicationGenerator(tree, {
    name: options.webName,
    directory: options.directory,
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

  const project = getProjects(tree).get(options.webName)

  updateJson(tree, join(project.root, 'project.json'), (json) => {
    json.targets.serve.options.port = options.port
    return json
  })

  return getProjects(tree).get(options.webName)
}
