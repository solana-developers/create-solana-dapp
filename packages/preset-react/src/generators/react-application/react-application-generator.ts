import { formatFiles, getProjects, installPackagesTask, Tree, updateJson } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { anchorApplicationGenerator } from '@solana-developers/preset-anchor'
import { applicationCleanup } from '@solana-developers/preset-common'
import { join } from 'path'
import {
  applicationTailwindConfig,
  generateReactApplication,
  NormalizedReactApplicationSchema,
  normalizeReactApplicationSchema,
  reactApplicationDependencies,
  reactApplicationRunScripts,
  walletAdapterDependencies,
} from '../../utils'
import reactTemplateGenerator from '../react-template/react-template-generator'
import { ReactApplicationSchema } from './react-application-schema'

export async function reactApplicationGenerator(tree: Tree, rawOptions: ReactApplicationSchema) {
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
    webName: options.webName,
    directory: join(project.root, 'src', 'app', 'solana'),
  })

  // Add the dependencies for the base application.
  reactApplicationDependencies(tree, options)

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
      template: options.anchor,
    })

    if (options.anchor === 'counter' && options.ui !== 'none') {
      // Generate the counter files
      await reactTemplateGenerator(tree, {
        name: options.webName,
        npmScope,
        template: 'anchor-counter',
        anchor: options.anchor,
        anchorName: options.anchorName,
        webName: options.webName,
        directory: join(project.root, 'src', 'app', 'counter'),
      })
    }
  }

  updateJson(tree, 'package.json', (json) => {
    json.scripts = {
      ...json.scripts,
      ...reactApplicationRunScripts({
        anchor: options.anchor,
        anchorName: options.anchorName,
        webName: options.webName,
      }),
    }
    return json
  })

  // Generate the readme files
  await reactTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: 'readme',
    anchor: options.anchor,
    anchorName: options.anchorName,
    webName: options.webName,
    directory: '.',
  })

  // Generate the license files
  await reactTemplateGenerator(tree, {
    name: options.webName,
    npmScope,
    template: 'license',
    anchor: options.anchor,
    anchorName: options.anchorName,
    webName: options.webName,
    directory: '.',
  })

  // Format the files.
  if (!options.skipFormat) {
    await formatFiles(tree)
  }

  // Install the packages on exit.
  return () => {
    installPackagesTask(tree, true)
  }
}

export default reactApplicationGenerator
