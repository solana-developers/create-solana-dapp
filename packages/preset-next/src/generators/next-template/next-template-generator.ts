import { generateFiles, Tree } from '@nx/devkit'
import * as path from 'path'
import { nextApplicationSubstitutions } from '../../utils'
import { NextTemplateSchema } from './next-template-schema'

export async function nextTemplateGenerator(tree: Tree, options: NextTemplateSchema) {
  const substitutions = nextApplicationSubstitutions({
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    name: options.webName,
    npmScope: options.npmScope,
  })
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
}

export default nextTemplateGenerator
