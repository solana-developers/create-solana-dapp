import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'

import { nextTemplateGenerator } from './next-template-generator'
import { NextTemplateSchema } from './next-template-schema'

describe('next-template generator', () => {
  let tree: Tree
  const options: NextTemplateSchema = {
    name: 'test',
    template: 'base',
    directory: 'test',
    anchor: 'none',
    anchorName: 'anchor',
    npmScope: 'test',
    webName: 'test',
  }
  const templates: NextTemplateSchema['template'][] = ['base', 'none', 'tailwind']

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it.each(templates)('should generate files for %s template', async (template) => {
    await nextTemplateGenerator(tree, { ...options, template })

    const contents = getRecursiveFileContents(tree, options.directory)
    expect(contents).toMatchSnapshot()
  })
})
