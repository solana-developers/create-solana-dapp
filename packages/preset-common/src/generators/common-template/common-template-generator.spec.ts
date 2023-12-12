import { Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '../../utils/get-recursive-file-contents'
import { commonTemplateGenerator } from './common-template-generator'
import { CommonTemplateSchema } from './common-template-schema'

describe('common-template generator', () => {
  let tree: Tree
  const options: CommonTemplateSchema = {
    name: 'test',
    template: 'license',
    directory: 'test',
    anchor: 'none',
    anchorName: 'anchor',
    npmScope: 'test',
    webName: 'test',
  }
  const templates: CommonTemplateSchema['template'][] = ['license', 'readme']
  const anchor: CommonTemplateSchema['anchor'][] = ['none', 'counter', 'hello-world']

  const matrix = templates.map((template) => anchor.map((anchor) => ({ template, anchor }))).flat()
  process.env['USER'] = 'test'

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it.each(matrix)('should generate files for %s template with %s anchor', async ({ template, anchor }) => {
    await commonTemplateGenerator(tree, { ...options, template, anchor })

    const contents = getRecursiveFileContents(tree, options.directory)
    expect(contents).toMatchSnapshot()
  })
})
