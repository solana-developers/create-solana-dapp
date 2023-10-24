import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'

import { applicationAnchorGenerator } from './application-anchor-generator'
import { ApplicationAnchorSchema } from './application-anchor-schema'

describe('application generator', () => {
  let tree: Tree
  const options: ApplicationAnchorSchema = { name: 'anchor-app', programName: 'my-test-program' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await applicationAnchorGenerator(tree, options)
    const config = readProjectConfiguration(tree, options.name)
    expect(config).toBeDefined()
  })

  it('should snapshot the generated structure', async () => {
    await applicationAnchorGenerator(tree, options)

    const config = readProjectConfiguration(tree, options.name)
    const contents = getRecursiveFileContents(tree, config.root)
    const stringified = JSON.stringify(contents, null, 2)
    expect(stringified).toMatchSnapshot()

    const rootTsConfig = tree.read('tsconfig.base.json').toString()
    expect(rootTsConfig).toMatchSnapshot()
  })
})
