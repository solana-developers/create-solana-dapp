import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree } from '@nx/devkit'
import { getRecursiveFileContents } from '@solana-developers/preset-common'

import { reactTemplateGenerator } from './react-template-generator'
import { ReactTemplateSchema } from './react-template-schema'

describe('react-template generator', () => {
  let tree: Tree
  const options: ReactTemplateSchema = {
    name: 'test',
    template: 'base',
    directory: 'test',
    anchor: 'none',
    anchorName: 'anchor',
    anchorProgram: 'my-program',
    npmScope: 'test',
    webName: 'test',
  }
  const templates: ReactTemplateSchema['template'][] = ['base', 'none', 'tailwind']
  process.env['USER'] = 'test'

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it.each(templates)('should generate files for %s template', async (template) => {
    await reactTemplateGenerator(tree, { ...options, template })

    const contents = getRecursiveFileContents(tree, options.directory)
    expect(contents).toMatchSnapshot()
  })
})
