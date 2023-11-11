import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  getProjects,
  installPackagesTask,
  Tree,
} from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { applicationAnchorGenerator } from '@solana-developers/preset-anchor'
import { applicationCleanup, packageVersion } from '@solana-developers/preset-common'
import {
  applicationReactDependencies,
  applicationTailwindConfig,
  walletAdapterDependencies,
} from '@solana-developers/preset-react'
import { join } from 'path'
import {
  applicationSubstitutions,
  generateNextApplication,
  normalizeApplicationNextSchema,
  NormalizedApplicationNextSchema,
} from '../../utils'
import { ApplicationNextSchema } from './application-next-schema'

export async function applicationNextGenerator(tree: Tree, rawOptions: ApplicationNextSchema) {
  const options: NormalizedApplicationNextSchema = normalizeApplicationNextSchema(rawOptions)
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

  const substitutions = applicationSubstitutions({
    anchor: options.anchor,
    anchorName: options.anchorName,
    name: options.webName,
    npmScope,
  })

  // Generate the common files.
  generateFiles(tree, join(__dirname, 'files/common'), project.root, substitutions)

  // Generate the files from the templates.
  generateFiles(tree, join(__dirname, 'files/ui', options.ui), project.root, substitutions)

  // Add the dependencies for the base application.
  applicationReactDependencies(tree, options)

  addDependenciesToPackageJson(tree, { encoding: packageVersion.encoding }, {})

  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)

  if (options.ui === 'tailwind') {
    // Add the tailwind config.
    await applicationTailwindConfig(tree, options.webName)
  }

  if (options.anchor !== 'none' && !getProjects(tree).has(options.anchorName)) {
    // Add the anchor application.
    await applicationAnchorGenerator(tree, {
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

export default applicationNextGenerator
