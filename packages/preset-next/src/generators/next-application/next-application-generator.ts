import {
  addDependenciesToPackageJson,
  formatFiles,
  getProjects,
  installPackagesTask,
  Tree,
  updateJson,
} from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { anchorApplicationGenerator } from '@solana-developers/preset-anchor'
import { applicationCleanup, packageVersion } from '@solana-developers/preset-common'
import {
  applicationTailwindConfig,
  reactApplicationDependencies,
  reactApplicationRunScripts,
  reactTemplateGenerator,
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
    webName: options.webName,
    directory: project.sourceRoot,
  })

  // Add the dependencies for the base application.
  reactApplicationDependencies(tree, options)

  addDependenciesToPackageJson(
    tree,
    {
      '@tanstack/react-query-next-experimental': packageVersion['@tanstack']['react-query-next-experimental'],
      encoding: packageVersion.encoding,
    },
    {},
  )

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
    if (options.anchor === 'counter') {
      tree.write(
        join(project.sourceRoot, 'app/counter/page.tsx'),
        `import CounterFeature from '@/components/counter/counter-feature';

export default function Page() {
  return <CounterFeature />;
}
`,
      )
      // Generate the counter files
      await reactTemplateGenerator(tree, {
        name: options.webName,
        npmScope,
        template: 'anchor-counter',
        anchor: options.anchor,
        anchorName: options.anchorName,
        webName: options.webName,
        directory: join(components, 'counter'),
        preset: 'next',
      })
    }
  }
  // Patch node-gyp-build error
  const nextConfigPath = join(project.root, 'next.config.js')
  const nextConfig = tree.read(nextConfigPath, 'utf-8')
  const needle = 'const nextConfig = {'
  const snippet = `webpack: (config) => {
    config.externals = [ ...(config.externals || []), 'bigint', 'node-gyp-build'];
    return config;
  },`
  tree.write(nextConfigPath, nextConfig.replace(needle, `${needle}\n${snippet}`))

  updateJson(tree, 'package.json', (json) => {
    json.scripts = {
      ...json.scripts,
      ...reactApplicationRunScripts({ anchorName: options.anchorName, webName: options.webName }),
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

export default nextApplicationGenerator
