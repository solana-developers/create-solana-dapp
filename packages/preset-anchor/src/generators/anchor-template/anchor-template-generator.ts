import { generateFiles, names, Tree } from '@nx/devkit'
import * as path from 'path'
import { AnchorTemplateSchema } from './anchor-template-schema'

export async function anchorTemplateGenerator(tree: Tree, options: AnchorTemplateSchema) {
  const substitutions = {
    projectName: options.projectName,
    ...names(options.name),
  }
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
  if (!options.skipUpdateIndexTs) {
    const indexExport = `export * from './${substitutions.fileName}-exports'`
    const indexTsPath = path.join(options.directory, 'src', 'index.ts')
    const content = tree.read(indexTsPath)?.toString() || ''
    tree.write(indexTsPath, content + '\n' + indexExport + '\n')
  }
}

export default anchorTemplateGenerator
