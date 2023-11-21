import { generateFiles, Tree } from '@nx/devkit'
import * as path from 'path'
import { applicationSubstitutions } from '../../utils'
import { ReactTemplateSchema } from './react-template-schema'

export async function reactTemplateGenerator(tree: Tree, options: ReactTemplateSchema) {
  const substitutions = applicationSubstitutions({
    anchor: options.anchor,
    anchorName: options.anchorName,
    name: options.webName,
    npmScope: options.npmScope,
  })
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
}

export default reactTemplateGenerator
