import { generateFiles, names, Tree } from '@nx/devkit'
import * as path from 'path'
import { AnchorTemplateSchema } from './anchor-template-schema'

export async function anchorTemplateGenerator(tree: Tree, options: AnchorTemplateSchema) {
  const substitutions = {
    projectName: options.name,
    ...names(options.template),
  }
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
}

export default anchorTemplateGenerator
