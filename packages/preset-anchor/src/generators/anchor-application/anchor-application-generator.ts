import { formatFiles, getProjects, Tree, updateJson } from '@nx/devkit'
import { libraryGenerator } from '@nx/js'
import { applicationCleanup, runCommand } from '@solana-developers/preset-common'
import { join } from 'path'
import {
  anchorApplicationIgnoreFiles,
  anchorApplicationDependencies,
  anchorApplicationNormalizeSchema,
  AnchorApplicationNormalizedSchema,
} from '../../utils'
import anchorTemplateGenerator from '../anchor-template/anchor-template-generator'
import { AnchorApplicationSchema } from './anchor-application-schema'

export async function anchorApplicationGenerator(tree: Tree, rawOptions: AnchorApplicationSchema) {
  const options: AnchorApplicationNormalizedSchema = anchorApplicationNormalizeSchema(rawOptions)
  await libraryGenerator(tree, {
    name: options.name,
    bundler: 'rollup',
    unitTestRunner: 'jest',
    skipFormat: true,
    linter: 'eslint',
  })
  const project = getProjects(tree).get(options.name)
  applicationCleanup(tree, join(project.sourceRoot))

  updateJson(tree, join(project.root, 'project.json'), (json) => {
    json.targets = {
      ...json.targets,
      anchor: runCommand(project.root, 'anchor'),
      localnet: runCommand(project.root, 'anchor localnet'),
      jest: json.targets.test,
      test: runCommand(project.root, 'anchor test'),
    }
    return json
  })

  await anchorTemplateGenerator(tree, {
    projectName: options.name,
    name: 'base',
    template: 'base',
    directory: project.root,
    skipUpdateIndexTs: true,
  })
  await anchorTemplateGenerator(tree, {
    projectName: options.name,
    name: options.template,
    template: options.template,
    directory: project.root,
  })
  anchorApplicationDependencies(tree)
  anchorApplicationIgnoreFiles(tree, project.sourceRoot.replace('/src', ''))

  if (!options.skipFormat) {
    await formatFiles(tree)
  }
}

export default anchorApplicationGenerator
