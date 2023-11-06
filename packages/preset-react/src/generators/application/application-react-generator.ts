import { formatFiles, generateFiles, getProjects, installPackagesTask, Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { applicationAnchorGenerator } from '@solana-developers/preset-anchor'
import { applicationCleanup } from '@solana-developers/preset-common'
import { join } from 'path'
import {
  applicationReactDependencies,
  applicationSubstitutions,
  applicationTailwindConfig,
  generateReactApplication,
  walletAdapterDependencies,
} from '../../utils'
import { normalizeApplicationReactSchema } from '../../utils/normalize-application-react-schema'
import { ApplicationReactSchema, NormalizedApplicationReactSchema } from './application-react-schema'

export async function applicationReactGenerator(tree: Tree, rawOptions: ApplicationReactSchema) {
  const options: NormalizedApplicationReactSchema = normalizeApplicationReactSchema(rawOptions)
  const npmScope = getNpmScope(tree)
  // Set up the base project.
  const project = await generateReactApplication(tree, options)
  // Clean up the default project files.
  applicationCleanup(tree, join(project.sourceRoot, 'app'))
  // Generate the files from the templates.
  generateFiles(
    tree,
    join(__dirname, 'files', options.uiLibrary),
    project.root,
    applicationSubstitutions({
      name: options.name,
      npmScope,
    }),
  )
  // Add the dependencies for the base application.
  applicationReactDependencies(tree, options)

  // Add the dependencies for the wallet adapter.
  walletAdapterDependencies(tree)

  if (options.uiLibrary === 'tailwind') {
    // Add the tailwind config.
    await applicationTailwindConfig(tree, options.name)
  }

  if (options.withAnchor && !getProjects(tree).has(options.anchorName)) {
    // Add the anchor application.
    await applicationAnchorGenerator(tree, {
      name: options.anchorName,
      skipFormat: true,
      template: options.anchorTemplate,
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

export default applicationReactGenerator
