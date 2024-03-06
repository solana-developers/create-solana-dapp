import { getProjects, Tree } from '@nx/devkit'
import { anchorApplicationGenerator } from '@solana-developers/preset-anchor'
import { Keypair } from '@solana/web3.js'
import { features, ReactFeature, reactFeatureGenerator } from '../generators/react-feature'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export async function setupAnchorReactFeature(
  tree: Tree,
  options: NormalizedReactApplicationSchema,
  keypair?: Keypair,
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
  await anchorApplicationGenerator(
    tree,
    { name: options.anchorName, programName: options.anchorProgram, skipFormat: true },
    keypair,
  )

  // Create the React feature
  await reactFeatureGenerator(
    tree,
    {
      name: options.anchorProgram,
      anchorName: options.anchorName,
      webName: options.webName,
      skipFormat: true,
      feature,
      ui: options.ui,
    },
    keypair,
  )
}
