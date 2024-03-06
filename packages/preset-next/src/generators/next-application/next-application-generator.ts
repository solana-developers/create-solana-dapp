import { installPackagesTask, Tree, updateJson } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { applicationCleanup } from '@solana-developers/preset-common'
import {
  generateReactCommonFiles,
  reactApplicationDependencies,
  reactApplicationUiConfig,
  reactTemplateGenerator,
  setupAnchorReactFeature,
  walletAdapterDependencies,
} from '@solana-developers/preset-react'
import { Keypair } from '@solana/web3.js'
import { join } from 'path'
import { generateNextApplication, NormalizedNextApplicationSchema, normalizeNextApplicationSchema } from '../../utils'
import nextTemplateGenerator from '../next-template/next-template-generator'
import { NextApplicationSchema } from './next-application-schema'

export async function nextApplicationGenerator(tree: Tree, rawOptions: NextApplicationSchema, keypair?: Keypair) {
  const options: NormalizedNextApplicationSchema = normalizeNextApplicationSchema(rawOptions)
  const project = await generateNextApplication(tree, options)
  const npmScope = getNpmScope(tree)

  // Clean up the default project files.
  const cleanup = [
    '/app/global.css',
    '/app/page.module.css',
    '/app/layout.tsx',
    '/app/page.tsx',
    '/public/favicon.ico',
    '/public/.gitkeep',
  ]
  applicationCleanup(tree, join(project.sourceRoot, 'app'), cleanup)

  // Generate the base files from the templates.
  await nextTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: 'base',
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    webName: options.webName,
    directory: project.sourceRoot,
  })

  // Generate the component files from the React template.
  const components = join(project.sourceRoot, 'components')
  await reactTemplateGenerator(
    tree,
    {
      name: options.webName,
      npmScope,
      template: options.ui,
      anchor: options.anchor,
      anchorName: options.anchorName,
      anchorProgram: options.anchorProgram,
      webName: options.webName,
      directory: components,
      preset: 'next',
    },
    'src/app/',
  )
  // Delete react app and routes.
  tree.delete(`${components}/app.tsx`)
  tree.delete(`${components}/app-routes.tsx`)

  // Generate the ui files from the templates.
  await nextTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: options.ui,
    anchor: options.anchor,
    anchorName: options.anchorName,
    anchorProgram: options.anchorProgram,
    webName: options.webName,
    directory: project.sourceRoot,
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
    directory: join(components, 'solana'),
    preset: 'next',
  })

  // Add the dependencies for the base application.
  reactApplicationDependencies(tree, options, 'next')

  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)

  // Add the ui config.
  await reactApplicationUiConfig(tree, options)

  // Set up the anchor feature.
  await setupAnchorReactFeature(tree, options, keypair)

  // Patch node-gyp-build error
  const nextConfigPath = join(project.root, 'next.config.js')
  const nextConfig = tree.read(nextConfigPath, 'utf-8')
  const needle = 'const nextConfig = {'
  const snippet = `webpack: (config) => {
    config.externals = [ ...(config.externals || []), 'bigint', 'node-gyp-build'];
    return config;
  },`
  tree.write(nextConfigPath, nextConfig.replace(needle, `${needle}\n${snippet}`))

  // Make sure to add these types to the tsconfig.json include array
  const nextTypes = '.next/types/**/*.ts'
  updateJson(tree, join(project.root, 'tsconfig.json'), (json) => {
    json.include = json.include || []
    if (!json.include.includes(nextTypes)) {
      json.include.push(nextTypes)
    } else {
      console.warn(
        `"${nextTypes}" already exists in the tsconfig.json include array, this can be removed from the generator.`,
      )
    }
    return json
  })

  // Generate the common files.
  await generateReactCommonFiles(tree, options, npmScope)

  // Install the packages on exit.
  return () => {
    installPackagesTask(tree, true)
  }
}

export default nextApplicationGenerator
