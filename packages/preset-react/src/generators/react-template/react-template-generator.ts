import { generateFiles, Tree } from '@nx/devkit'
import * as path from 'path'
import { reactApplicationSubstitutions } from '../../utils'
import { ReactTemplateSchema } from './react-template-schema'

export async function reactTemplateGenerator(tree: Tree, options: ReactTemplateSchema, templatePath = '') {
  const substitutions = reactApplicationSubstitutions({
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    licenseAuthor: options.licenseAuthor,
    name: options.webName,
    npmScope: options.npmScope,
    preset: options.preset,
  })
  generateFiles(tree, path.join(__dirname, 'files', options.template, templatePath), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
}

export default reactTemplateGenerator
