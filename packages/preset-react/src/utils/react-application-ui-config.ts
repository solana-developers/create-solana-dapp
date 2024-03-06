import { Tree } from '@nx/devkit'
import { setupTailwindGenerator } from '@nx/react'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export async function reactApplicationUiConfig(
  tree: Tree,
  options: Pick<NormalizedReactApplicationSchema, 'ui' | 'webName'>,
) {
  const { ui, webName: project } = options

  switch (ui) {
    case 'tailwind':
      await reactApplicationUiTailwind(tree, project)
      break
    case 'none':
    default:
      return
  }
}

async function reactApplicationUiTailwind(tree: Tree, project: string) {
  await setupTailwindGenerator(tree, { project, skipFormat: true })
  const tailwindConf = tree.read(`${project}/tailwind.config.js`).toString()
  tree.write(`${project}/tailwind.config.js`, tailwindConf.replace('plugins: []', "plugins: [require('daisyui')]"))
}
