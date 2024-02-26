import { getProjects, ProjectConfiguration, Tree } from '@nx/devkit'
import { anchorApplicationGenerator } from '@solana-developers/preset-anchor'
import { join } from 'path'
import { features, ReactFeature, reactFeatureGenerator } from '../generators/react-feature'
import { createNextPageRouteAnchorCounter } from './create-next-page-route-anchor-counter'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export async function setupAnchorReactFeature(
  tree: Tree,
  options: NormalizedReactApplicationSchema,
  project: ProjectConfiguration,
  preset: 'react' | 'next',
) {
  if (options.anchor === 'none' || getProjects(tree).has(options.anchorName)) {
    return
  }

  const feature: ReactFeature = features.find((feature) => feature.toString() === `anchor-${options.anchor}`)

  if (!feature) {
    throw new Error(`Invalid anchor feature: ${options.anchor}`)
  }

  await anchorApplicationGenerator(tree, {
    name: options.anchorName,
    skipFormat: true,
  })

  await reactFeatureGenerator(tree, {
    name: feature.replace('anchor-', '').toString(),
    anchorName: options.anchorName,
    webName: options.webName,
    skipFormat: true,
    feature,
  })

  if (preset === 'next' && options.anchor === 'counter' && options.ui !== 'none') {
    createNextPageRouteAnchorCounter(
      tree,
      join(project.sourceRoot, `app/${options.anchorName}/page.tsx`),
      options.anchorName,
    )
  }
}
