import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import anchorTemplateGenerator from './anchor-template-generator'
import { AnchorTemplateSchema } from './anchor-template-schema'

describe('anchor-template generator', () => {
  let tree: Tree
  const options: AnchorTemplateSchema = { name: 'test', directory: 'target', template: 'base' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })
  it.each(['base', 'counter', 'hello-world'])(
    'should generate files for %s template',
    async (template: AnchorTemplateSchema['template']) => {
      await anchorTemplateGenerator(tree, { ...options, template: template as AnchorTemplateSchema['template'] })

      const contents = getRecursiveFileContents(tree, options.directory)
      expect(contents).toMatchSnapshot()
    },
  )
})
