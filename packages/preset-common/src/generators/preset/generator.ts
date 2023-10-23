import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit'
import * as path from 'path'
import { PresetGeneratorSchema } from './schema'

export async function presetGenerator(tree: Tree, options: PresetGeneratorSchema) {
  const projectRoot = `libs/${options.name}`
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {},
  })
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
  await formatFiles(tree)
}

export default presetGenerator
