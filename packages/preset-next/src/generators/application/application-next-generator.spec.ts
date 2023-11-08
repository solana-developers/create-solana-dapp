import { getProjects, readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import { applicationReactGenerator, ApplicationReactUiLibrary } from '@solana-developers/preset-react'

import { normalizeApplicationNextSchema, NormalizedApplicationNextSchema } from '../../utils'
import { applicationNextGenerator } from './application-next-generator'
import { ApplicationNextSchema } from './application-next-schema'

describe('application generator', () => {
  let tree: Tree
  const rawOptions: ApplicationNextSchema = { name: 'test-app' }
  const options: NormalizedApplicationNextSchema = normalizeApplicationNextSchema(rawOptions)

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  describe('default apps', () => {
    it.each([['none'], ['tailwind']])('should generate default app with "%s" ui', async (uiLibrary) => {
      await applicationNextGenerator(tree, { ...rawOptions, uiLibrary: uiLibrary as ApplicationReactUiLibrary })

      const appConfig = readProjectConfiguration(tree, options.appName)
      const anchorConfig = readProjectConfiguration(tree, options.anchorName)
      expect(appConfig).toBeDefined()
      expect(anchorConfig).toBeDefined()

      const contents = getRecursiveFileContents(tree, '.')
      const stringified = JSON.stringify(contents, null, 2)
      expect(stringified).toMatchSnapshot()
    })
  })

  describe('custom apps', () => {
    it('should generate 4 Next apps and 2 Anchor apps', async () => {
      await applicationNextGenerator(tree, { ...rawOptions, uiLibrary: 'none' })
      await applicationNextGenerator(tree, { ...rawOptions, name: 'app-1', uiLibrary: 'none' })
      await applicationNextGenerator(tree, { ...rawOptions, name: 'app-2', uiLibrary: 'none' })
      await applicationNextGenerator(tree, { ...rawOptions, name: 'app-3', anchorName: 'anchor-1', uiLibrary: 'none' })

      const app0 = readProjectConfiguration(tree, options.appName)
      const app1 = readProjectConfiguration(tree, 'app-1')
      const app2 = readProjectConfiguration(tree, 'app-2')
      const app3 = readProjectConfiguration(tree, 'app-3')
      const anchor0Config = readProjectConfiguration(tree, options.anchorName)
      const anchor1Config = readProjectConfiguration(tree, 'anchor-1')
      const projects = getProjects(tree)

      expect(app0).toBeDefined()
      expect(app1).toBeDefined()
      expect(app2).toBeDefined()
      expect(app3).toBeDefined()
      expect(anchor0Config).toBeDefined()
      expect(anchor1Config).toBeDefined()
      expect(projects.size).toEqual(6)
    })

    it('should generate app without anchor', async () => {
      await applicationNextGenerator(tree, { ...rawOptions, uiLibrary: 'none', withAnchor: false })
      const projects = getProjects(tree)
      const appProject = projects.has(options.appName)
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()
    })

    it.each([['none'], ['tailwind']])('should generate app with custom name and "%s" ui', async (uiLibrary) => {
      await applicationReactGenerator(tree, {
        ...rawOptions,
        appName: 'web-app',
        uiLibrary: uiLibrary as ApplicationReactUiLibrary,
        withAnchor: false,
      })
      const projects = getProjects(tree)
      const appProject = projects.has('web-app')
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()
    })
  })
})
