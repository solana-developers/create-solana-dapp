import { installPackagesTask, Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { applicationCleanup } from '@solana-developers/preset-common'
import { Keypair } from '@solana/web3.js'
import { join } from 'path'
import {
  generateReactApplication,
  generateReactCommonFiles,
  NormalizedReactApplicationSchema,
  normalizeReactApplicationSchema,
  reactApplicationDependencies,
  reactApplicationUiConfig,
  setupAnchorReactFeature,
  walletAdapterDependencies,
} from '../../utils'
import { reactTemplateGenerator } from '../react-template/react-template-generator'
import { ReactApplicationSchema } from './react-application-schema'

export async function reactApplicationGenerator(tree: Tree, rawOptions: ReactApplicationSchema, keypair?: Keypair) {
  const options: NormalizedReactApplicationSchema = normalizeReactApplicationSchema(rawOptions)
  const npmScope = getNpmScope(tree)
  // Set up the base project.
  const project = await generateReactApplication(tree, options)
  // Clean up the default project files.
  applicationCleanup(tree, join(project.sourceRoot, 'app'))

  // Generate the base files from the templates.
  await reactTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: 'base',
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    webName: options.webName,
    directory: project.root,
  })

  // Generate the ui files from the templates.
  await reactTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: options.ui,
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    webName: options.webName,
    directory: project.root,
  })

  // Generate the solana-provider from the templates.
  await reactTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: 'solana-provider',
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    webName: options.webName,
    directory: join(project.root, 'src', 'app', 'solana'),
  })

  // Add the dependencies for the base application.
  reactApplicationDependencies(tree, options, 'react')

  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)

  // Add the tailwind config.
  await reactApplicationUiConfig(tree, options)

  // Set up the anchor feature.
  await setupAnchorReactFeature(tree, options, keypair)

  // Generate the common files.
  await generateReactCommonFiles(tree, options, npmScope)

  // Install the packages on exit.
  return () => {
    installPackagesTask(tree, true)
  }
}

export default reactApplicationGenerator
