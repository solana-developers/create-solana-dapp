import { generateFiles, names, Tree } from '@nx/devkit'
import { Keypair } from '@solana/web3.js'
import * as path from 'path'
import { AnchorTemplateSchema } from './anchor-template-schema'

export async function anchorTemplateGenerator(
  tree: Tree,
  options: AnchorTemplateSchema,
  keypair: Keypair = Keypair.generate(),
) {
  const variants = names(options.name)
  const substitutions = {
    publicKey: keypair.publicKey.toString(),
    projectName: options.projectName,
    ...variants,
    upperCaseName: variants.fileName.toUpperCase().replace(/-/g, '_'),
  }
  generateFiles(tree, path.join(__dirname, 'files', options.template), options.directory, {
    ...options,
    ...substitutions,
    fileNameUnderscore: substitutions.fileName.replace(/-/g, '_'),
  })
  if (options.template !== 'base') {
    tree.write(
      `${options.directory}/target/deploy/${substitutions.fileName.replace(/-/g, '_')}-keypair.json`,
      `[${keypair.secretKey.join(',')}]`,
    )
  }
  if (!options.skipUpdateIndexTs) {
    const indexExport = `export * from './${substitutions.fileName}-exports'`
    const indexTsPath = path.join(options.directory, 'src', 'index.ts')
    const content = tree.read(indexTsPath)?.toString() || ''
    tree.write(indexTsPath, content + '\n' + indexExport + '\n')
  }
}

export default anchorTemplateGenerator
