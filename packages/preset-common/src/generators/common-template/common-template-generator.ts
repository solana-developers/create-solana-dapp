import { generateFiles, PackageManager, Tree } from '@nx/devkit'
import * as path from 'path'
import { genericSubstitutions } from '../../utils/generic-substitutions'
import { CommonTemplateSchema } from './common-template-schema'

export async function commonTemplateGenerator(tree: Tree, options: CommonTemplateSchema, pm?: PackageManager) {
  const substitutions = genericSubstitutions(
    {
      anchor: options.anchor,
      anchorName: options.anchorName,
      anchorProgram: options.anchorProgram,
      licenseAuthor: options.licenseAuthor,
      name: options.webName,
      npmScope: options.npmScope,
      preset: options.preset,
    },
    pm,
  )
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
}

export default commonTemplateGenerator
