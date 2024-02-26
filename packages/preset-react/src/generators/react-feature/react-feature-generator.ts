import { generateFiles, getProjects, Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { AnchorApplicationSchema, anchorTemplateGenerator } from '@solana-developers/preset-anchor'
import { genericSubstitutions } from '@solana-developers/preset-common'
import { join } from 'path'
import { ReactFeatureSchema } from './react-feature-schema'

export async function reactFeatureGenerator(tree: Tree, options: ReactFeatureSchema) {
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

  // const { fileName: featureFileName } = names(options.name)

  await anchorTemplateGenerator(tree, {
    projectName: options.anchorName,
    name: substitutions.fileName,
    template: anchorTemplate,
    directory: anchorProject.root,
  })

  generateFiles(
    tree,
    join(__dirname, 'files', options.feature), // Source
    join(webProject.root, 'src', 'app', substitutions.fileName), // Destination
    {
      ...options,
      ...substitutions,
    },
  )
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
