import { readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'

import { applicationReactGenerator } from './application-react-generator'
import { ApplicationReactSchema } from './application-react-schema'

describe('application generator', () => {
  let tree: Tree
  const options: ApplicationReactSchema = { name: 'test-app' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  describe('ui library: none', () => {
    it('should snapshot the generated structure', async () => {
      await applicationReactGenerator(tree, { ...options, uiLibrary: 'none' })

      const config = readProjectConfiguration(tree, options.name)
      const contents = getRecursiveFileContents(tree, '.')
      const stringified = JSON.stringify(contents, null, 2)
      expect(stringified).toMatchSnapshot()
    })
  })

  describe('ui library: tailwind', () => {
    it('should snapshot the generated structure', async () => {
      await applicationReactGenerator(tree, { ...options, uiLibrary: 'tailwind' })

      const config = readProjectConfiguration(tree, options.name)
      const contents = getRecursiveFileContents(tree, '.')
      const stringified = JSON.stringify(contents, null, 2)
      expect(stringified).toMatchSnapshot()
    })
  })
})
