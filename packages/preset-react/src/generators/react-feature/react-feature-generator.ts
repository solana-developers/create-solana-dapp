import { generateFiles, getProjects, Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { AnchorApplicationSchema, anchorTemplateGenerator } from '@solana-developers/preset-anchor'
import { genericSubstitutions } from '@solana-developers/preset-common'
import { Keypair } from '@solana/web3.js'
import { join } from 'path'
import { ReactFeatureSchema } from './react-feature-schema'

export async function reactFeatureGenerator(
  tree: Tree,
  options: Omit<ReactFeatureSchema, 'npmScope'>,
  keypair?: Keypair,
) {
  const npmScope = getNpmScope(tree)
  const projects = getProjects(tree)

  const anchorProject = projects.get(options.anchorName)
  const webProject = projects.get(options.webName)

  if (!anchorProject) {
    throw new Error(`Could not find anchor project: ${options.anchorName}`)
  }
  if (!webProject) {
    throw new Error(`Could not find web project: ${options.webName}`)
  }

  const anchorTemplate: AnchorApplicationSchema['template'] = getTemplateName(options.feature)

  if (anchorTemplate === 'none') {
    throw new Error(`Could not find anchor template for feature: ${options.feature}`)
  }

  const substitutions = genericSubstitutions({
    ...options,
    anchorName: options.anchorName,
    anchor: anchorTemplate,
    preset: options.preset,
    npmScope,
  })

  await anchorTemplateGenerator(
    tree,
    {
      projectName: options.anchorName,
      name: substitutions.fileName,
      template: anchorTemplate,
      directory: anchorProject.root,
    },
    keypair,
  )

  // We don't need to create the React code if the UI is set to none
  if (options.ui === 'none') {
    return
  }

  const source = join(__dirname, 'files', options.feature)
  const target =
    options.preset === 'react'
      ? join(webProject.root, 'src', 'app', substitutions.fileName)
      : join(webProject.root, 'components', substitutions.fileName)

  generateFiles(tree, source, target, {
    ...options,
    ...substitutions,
  })
}

export default reactFeatureGenerator

function getTemplateName(feature: ReactFeatureSchema['feature']): AnchorApplicationSchema['template'] {
  switch (feature) {
    case 'anchor-counter':
      return 'counter'
    case 'anchor-hello-world':
      return 'hello-world'
    default:
      throw new Error(`Unknown feature: ${feature}`)
  }
}
