import { addDependenciesToPackageJson, formatFiles, getProjects, installPackagesTask, Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { anchorApplicationGenerator } from '@solana-developers/preset-anchor'
import { applicationCleanup, packageVersion } from '@solana-developers/preset-common'
import {
  applicationTailwindConfig,
  reactApplicationDependencies,
  walletAdapterDependencies,
} from '@solana-developers/preset-react'
import { join } from 'path'
import { generateNextApplication, NormalizedNextApplicationSchema, normalizeNextApplicationSchema } from '../../utils'
import nextTemplateGenerator from '../next-template/next-template-generator'
import { NextApplicationSchema } from './next-application-schema'

export async function nextApplicationGenerator(tree: Tree, rawOptions: NextApplicationSchema) {
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
    webName: options.webName,
    directory: project.sourceRoot,
  })

  // Generate the ui files from the templates.
  await nextTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: options.ui,
    anchor: options.anchor,
    anchorName: options.anchorName,
    webName: options.webName,
    directory: project.sourceRoot,
  })

  // Add the dependencies for the base application.
  reactApplicationDependencies(tree, options)

  addDependenciesToPackageJson(tree, { encoding: packageVersion.encoding }, {})

  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)

  if (options.ui === 'tailwind') {
    // Add the tailwind config.
    await applicationTailwindConfig(tree, options.webName)
  }

  if (options.anchor !== 'none' && !getProjects(tree).has(options.anchorName)) {
    // Add the anchor application.
    await anchorApplicationGenerator(tree, {
      name: options.anchorName,
      skipFormat: true,
    })
  }

  // Format the files.
  if (!options.skipFormat) {
    await formatFiles(tree)
  }

  // Install the packages on exit.
  return () => {
    installPackagesTask(tree, true)
  }
}

export default nextApplicationGenerator
