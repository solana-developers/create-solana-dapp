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
      build: runCommand(project.root, 'anchor build'),
      clean: runCommand(project.root, 'anchor clean'),
      deploy: runCommand(project.root, 'anchor deploy'),
      localnet: runCommand(project.root, 'anchor localnet'),
      publish: runCommand(project.root, 'anchor publish'),
      jest: json.targets.test,
      test: runCommand(project.root, 'anchor test'),
    }
    return json
  })

  await anchorTemplateGenerator(tree, {
    name: options.name,
    template: 'base',
    directory: options.name,
  })
  await anchorTemplateGenerator(tree, {
    name: options.name,
    template: options.template,
    directory: options.name,
  })
  anchorApplicationDependencies(tree)
  anchorApplicationIgnoreFiles(tree, project.sourceRoot.replace('/src', ''))

  if (!options.skipFormat) {
    await formatFiles(tree)
  }
}

export default anchorApplicationGenerator
