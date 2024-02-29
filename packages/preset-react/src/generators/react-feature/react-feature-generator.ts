import { generateFiles, getProjects, Tree } from '@nx/devkit'
import { getNpmScope } from '@nx/js/src/utils/package-json/get-npm-scope'
import { AnchorApplicationSchema, anchorTemplateGenerator } from '@solana-developers/preset-anchor'
import { addArrayItem, genericSubstitutions, getArrayItem, updateSourceFile } from '@solana-developers/preset-common'
import { Keypair } from '@solana/web3.js'
import { join } from 'path'
import { getReactPreset, ReactPreset } from '../../utils'
import { ReactFeatureSchema } from './react-feature-schema'

export async function reactFeatureGenerator(
  tree: Tree,
  options: Omit<ReactFeatureSchema, 'npmScope'>,
  keypair?: Keypair,
) {
  const npmScope = getNpmScope(tree)
  const projects = getProjects(tree)

  const anchorProject = projects.get(options.anchorName)
  const webProject = projects.get(options.webName)

  if (!anchorProject) {
    throw new Error(`Could not find anchor project: ${options.anchorName}`)
  }
  if (!webProject) {
    throw new Error(`Could not find web project: ${options.webName}`)
  }
  const preset = getReactPreset(tree, webProject.sourceRoot)

  const anchorTemplate: AnchorApplicationSchema['template'] = getTemplateName(options.feature)

  if (anchorTemplate === 'none') {
    throw new Error(`Could not find anchor template for feature: ${options.feature}`)
  }

  const substitutions = genericSubstitutions({
    ...options,
    anchorName: options.anchorName,
    anchorProgram: options.name,
    anchor: anchorTemplate,
    preset,
    npmScope,
  })

  await anchorTemplateGenerator(
    tree,
    {
      projectName: options.anchorName,
      name: substitutions.anchorProgram.fileName,
      template: anchorTemplate,
      directory: anchorProject.root,
    },
    keypair,
  )

  // We don't need to create the React code if the UI is set to none
  if (options.ui === 'none') {
    return
  }

  const source = join(__dirname, 'files', options.feature)
  const target =
    preset === 'react'
      ? join(webProject.root, 'src', 'app', substitutions.fileName)
      : join(webProject.root, 'components', substitutions.fileName)

  generateFiles(tree, source, target, {
    ...options,
    ...substitutions,
  })

  const path = substitutions.anchorProgram.fileName
  const label = substitutions.anchorProgram.className

  const routesFile = join(webProject.sourceRoot, 'app', getRouteFile(preset))

  if (!tree.exists(routesFile)) {
    console.warn(`Could not find routes file: ${routesFile}`)
    return
  }

  // Add the navigation link
  updateSourceFile(tree, routesFile, (source) => {
    addArrayItem(source, { name: 'links', content: `{ label: '${label} Program', path: '/${path}' },` })
    return source
  })

  if (preset === 'next') {
    const route = join(webProject.root, 'app', path, 'page.tsx')
    // Add Next Route and Link
    tree.write(
      route,
      `import ${label}Feature from '@/components/${path}/${path}-feature';

export default function Page() {
  return <${label}Feature />;
}
`,
    )
  }

  // Add the lazy import
  if (preset === 'react') {
    const lazyImport = `const ${label}Feature = lazy(() => import('./${path}/${path}-feature'))`

    updateSourceFile(tree, routesFile, (source) => {
      // Add the lazy import before the links array
      source.insertText(getArrayItem(source, 'links').getStartLinePos(), `${lazyImport}\n`)

      // Add the route
      addArrayItem(source, { name: 'routes', content: `{ path: '${path}/*', element: <${label}Feature /> },` })
      return source
    })
  }
}

function getRouteFile(preset: ReactPreset) {
  switch (preset) {
    case 'react':
      return 'app-routes.tsx'
    case 'next':
      return 'layout.tsx'
    default:
      throw new Error(`Unknown preset: ${preset}`)
  }
}
export default reactFeatureGenerator

function getTemplateName(feature: ReactFeatureSchema['feature']): AnchorApplicationSchema['template'] {
  switch (feature) {
    case 'anchor-counter':
      return 'counter'
    case 'anchor-basic':
      return 'basic'
    default:
      throw new Error(`Unknown feature: ${feature}`)
  }
}
