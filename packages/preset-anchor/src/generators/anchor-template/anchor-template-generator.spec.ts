import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import anchorTemplateGenerator from './anchor-template-generator'
import { AnchorTemplateSchema } from './anchor-template-schema'

describe('anchor-template generator', () => {
  let tree: Tree
  const options: AnchorTemplateSchema = { name: 'test', projectName: 'test', directory: 'target', template: 'base' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })
  it.each(['base', 'counter', 'hello-world'])(
    'should generate files for %s template',
    async (template: AnchorTemplateSchema['template']) => {
      await anchorTemplateGenerator(tree, {
        ...options,
        name: template,
        template: template as AnchorTemplateSchema['template'],
      })

      const contents = getRecursiveFileContents(tree, options.directory)
      expect(contents).toMatchSnapshot()
    },
  )
  it('should be able to generate two templates side by side', async () => {
    await anchorTemplateGenerator(tree, {
      ...options,
      name: 'counter-one',
      template: 'counter',
    })
    await anchorTemplateGenerator(tree, {
      ...options,
      name: 'counter-two',
      template: 'counter',
    })

    const contents = getRecursiveFileContents(tree, options.directory)
    expect(contents).toMatchSnapshot()
    expect(tree.read(options.directory + '/src/index.ts').toString()).toMatchInlineSnapshot(`
      "
      export * from './counter-one-exports'

      export * from './counter-two-exports'
      "
    `)
  })
})
