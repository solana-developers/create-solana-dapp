import { getProjects, Tree, updateJson } from '@nx/devkit'
import { Linter } from '@nx/linter'
import { applicationGenerator as reactApplicationGenerator } from '@nx/next/src/generators/application/application'
import { join } from 'path'
import { NormalizedApplicationNextSchema } from './normalize-application-next-schema'

export async function generateNextApplication(tree: Tree, options: NormalizedApplicationNextSchema) {
  await reactApplicationGenerator(tree, {
    name: options.appName,
    style: 'css',
    skipFormat: true,
    projectNameAndRootFormat: 'as-provided',
    unitTestRunner: 'none',
    e2eTestRunner: 'none',
    linter: Linter.EsLint,
    rootProject: false,
  })

  const project = getProjects(tree).get(options.appName)

  updateJson(tree, join(project.root, 'project.json'), (json) => {
    json.targets.serve.options.port = options.port
    return json
  })

  return project
}
