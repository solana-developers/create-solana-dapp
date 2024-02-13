import { formatFiles, Tree, updateJson } from '@nx/devkit'
import { commonTemplateGenerator } from '@solana-developers/preset-common'
import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'
import { reactApplicationRunScripts } from './react-application-run-scripts'

export async function generateReactCommonFiles(
  tree: Tree,
  options: NormalizedReactApplicationSchema,
  npmScope: string,
) {
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

  if (!tree.exists('README.md')) {
    // Generate the readme files
    await commonTemplateGenerator(tree, {
      name: options.webName,
      npmScope,
      template: 'readme',
      anchor: options.anchor,
      anchorName: options.anchorName,
      webName: options.webName,
      directory: '.',
    })
  }

  if (!tree.exists('LICENSE') && !tree.exists('LICENSE.md')) {
    // Generate the license files
    await commonTemplateGenerator(tree, {
      name: options.webName,
      npmScope,
      template: 'license',
      anchor: options.anchor,
      anchorName: options.anchorName,
      webName: options.webName,
      directory: '.',
    })
  }

  // Format the files.
  if (!options.skipFormat) {
    await formatFiles(tree)
  }
}
