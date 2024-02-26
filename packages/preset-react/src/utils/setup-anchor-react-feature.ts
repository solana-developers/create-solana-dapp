import { getProjects, Tree } from '@nx/devkit'
import { anchorApplicationGenerator } from '@solana-developers/preset-anchor'
import { join } from 'path'
import { features, ReactFeature, reactFeatureGenerator } from '../generators/react-feature'
import { createNextPageRouteAnchorCounter } from './create-next-page-route-anchor-counter'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export async function setupAnchorReactFeature(
  tree: Tree,
  options: NormalizedReactApplicationSchema,
  sourceRoot: string,
  preset: 'react' | 'next',
) {
  if (options.anchor === 'none' || getProjects(tree).has(options.anchorName)) {
    return
  }

  const featureName = options.anchor
  const feature: ReactFeature = features.find((feature) => feature.toString() === `anchor-${featureName}`)

  if (!feature) {
    throw new Error(`Invalid anchor feature: ${featureName}`)
  }

  // Create the Anchor application
  await anchorApplicationGenerator(tree, { name: options.anchorName, skipFormat: true })

  // Create the React feature
  await reactFeatureGenerator(tree, {
    name: featureName,
    anchorName: options.anchorName,
    webName: options.webName,
    skipFormat: true,
    feature,
    preset,
    ui: options.ui,
  })

  // For Next.js, create a page route for the counter feature
  if (preset === 'next' && options.ui !== 'none' && featureName === 'counter') {
    createNextPageRouteAnchorCounter(tree, join(sourceRoot, `app/${featureName}/page.tsx`), featureName)
  }
}
