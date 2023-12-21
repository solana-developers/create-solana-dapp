import { Tree } from '@nx/devkit'
import { setupTailwindGenerator } from '@nx/react'

export async function applicationTailwindConfig(tree: Tree, project: string) {
  await setupTailwindGenerator(tree, { project, skipFormat: true })
  const tailwindConf = tree.read(`${project}/tailwind.config.js`).toString()
  tree.write(`${project}/tailwind.config.js`, tailwindConf.replace('plugins: []', "plugins: [require('daisyui')]"))
}
