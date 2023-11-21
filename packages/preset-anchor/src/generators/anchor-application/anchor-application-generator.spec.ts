import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import {
  AnchorApplicationTemplate,
  anchorApplicationNormalizeSchema,
  AnchorApplicationNormalizedSchema,
} from '../../utils'
import { anchorApplicationGenerator } from './anchor-application-generator'
import { AnchorApplicationSchema } from './anchor-application-schema'

describe('anchor-application generator', () => {
  let tree: Tree
  const rawOptions: AnchorApplicationSchema = { name: 'anchor-app' }
  const options: AnchorApplicationNormalizedSchema = anchorApplicationNormalizeSchema(rawOptions)

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await anchorApplicationGenerator(tree, options)
    const config = readProjectConfiguration(tree, options.name)
    expect(config).toBeDefined()
  })

  it.each([['counter'], ['hello-world']])('should generate app with "%s" template', async (template) => {
    await anchorApplicationGenerator(tree, { ...options, template: template as AnchorApplicationTemplate })

    const config = readProjectConfiguration(tree, options.name)
    const contents = getRecursiveFileContents(tree, config.root)
    expect(contents).toMatchSnapshot()

    const rootTsConfig = tree.read('tsconfig.base.json').toString()
    expect(rootTsConfig).toMatchSnapshot()
  })
})
