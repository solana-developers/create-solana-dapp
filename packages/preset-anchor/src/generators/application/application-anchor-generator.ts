import { formatFiles, generateFiles, getProjects, names, Tree, updateJson } from '@nx/devkit'
import { libraryGenerator } from '@nx/js'
import { applicationCleanup, runCommand } from '@solana-developers/preset-common'
import * as path from 'path'
import { join } from 'path'
import { addAnchorIgnoreFields, applicationAnchorDependencies } from '../../utils'
import { normalizeApplicationAnchorSchema } from '../../utils/normalize-application-anchor-schema'
import { ApplicationAnchorSchema } from './application-anchor-schema'

export async function applicationAnchorGenerator(tree: Tree, rawOptions: ApplicationAnchorSchema) {
  const options = normalizeApplicationAnchorSchema(rawOptions)
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
    return {
      ...json,
      targets: {
        ...json.targets,
        build: runCommand(project.root, 'anchor build'),
        clean: runCommand(project.root, 'anchor clean'),
        deploy: runCommand(project.root, 'anchor deploy'),
        localnet: runCommand(project.root, 'anchor localnet'),
        publish: runCommand(project.root, 'anchor publish'),
        jest: json.targets.test,
        test: runCommand(project.root, 'anchor test'),
      },
    }
  })

  const substitutions = {
    projectName: options.name,
    ...names(options.template),
  }
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.name, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
  applicationAnchorDependencies(tree)
  addAnchorIgnoreFields(tree)

  if (!options.skipFormat) {
    await formatFiles(tree)
  }
}

export default applicationAnchorGenerator
