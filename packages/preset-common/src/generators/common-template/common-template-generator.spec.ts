import { PackageManager, Tree } from '@nx/devkit'
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
  const anchor: CommonTemplateSchema['anchor'][] = ['none', 'counter', 'basic']
  const pms: PackageManager[] = ['npm', 'pnpm', 'yarn']
  const matrix = templates.flatMap((template) =>
    anchor.flatMap((anchor) => pms.map((pm) => ({ template, anchor, pm }))),
  )
  process.env['USER'] = 'test'

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it.each(matrix)('should generate files: %s', async ({ template, anchor, pm }) => {
    await commonTemplateGenerator(tree, { ...options, template, anchor }, pm)

    const contents = getRecursiveFileContents(tree, options.directory)
    expect(contents).toMatchSnapshot()
  })
})
