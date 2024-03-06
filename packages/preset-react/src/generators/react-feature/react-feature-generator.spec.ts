import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import reactFeatureGenerator from './react-feature-generator'
import { reactFeatureGeneratorFixtures } from './react-feature-generator.fixtures'
import { features } from './react-feature-helpers'
import { ReactApplicationSchema } from '../react-application/react-application-schema'
import reactApplicationGenerator from '../react-application/react-application-generator'

describe('react-feature generator', () => {
  let tree: Tree
  const appOptions: ReactApplicationSchema = {
    skipFormat: true,
    anchor: 'counter',
    name: 'proj',
    webName: 'web-app',
    anchorName: 'anchor-app',
    ui: 'tailwind',
  }
  process.env['USER'] = 'test'
  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace()
    await reactApplicationGenerator(tree, appOptions, reactFeatureGeneratorFixtures)
  })

  it('should export an array of features', () => {
    expect(features).toMatchInlineSnapshot(`
      [
        "anchor-counter",
        "anchor-basic",
      ]
    `)
  })

  it.each(features)('should generate files for %s feature', async (feature) => {
    await reactFeatureGenerator(
      tree,
      {
        name: `my-${feature}-program`,
        feature,
        skipFormat: true,
        anchorName: appOptions.anchorName,
        webName: appOptions.webName,
      },
      reactFeatureGeneratorFixtures,
    )
    const contents = getRecursiveFileContents(tree, '.')
    expect(contents).toMatchSnapshot()
  })
})
