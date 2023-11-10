import { getProjects, readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import { ApplicationReactUi, normalizeApplicationReactSchema, NormalizedApplicationReactSchema } from '../../utils'

import { applicationReactGenerator } from './application-react-generator'
import { ApplicationReactSchema } from './application-react-schema'

describe('application react generator', () => {
  let tree: Tree
  const rawOptions: ApplicationReactSchema = { name: 'test-app', anchor: 'counter' }
  const options: NormalizedApplicationReactSchema = normalizeApplicationReactSchema(rawOptions)

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  describe('default apps', () => {
    it.each([['none'], ['tailwind']])('should generate default app with "%s" ui', async (ui) => {
      await applicationReactGenerator(tree, { ...rawOptions, ui: ui as ApplicationReactUi })

      const appConfig = readProjectConfiguration(tree, options.webName)
      const anchorConfig = readProjectConfiguration(tree, options.anchorName)
      expect(appConfig).toBeDefined()
      expect(anchorConfig).toBeDefined()

      const contents = getRecursiveFileContents(tree, '.')
      expect(contents).toMatchSnapshot()
    })
  })

  describe('custom apps', () => {
    it('should generate 4 React apps and 2 Anchor apps', async () => {
      await applicationReactGenerator(tree, { ...rawOptions, ui: 'none' })
      await applicationReactGenerator(tree, { ...rawOptions, name: 'app-1', ui: 'none' })
      await applicationReactGenerator(tree, { ...rawOptions, name: 'app-2', ui: 'none' })
      await applicationReactGenerator(tree, { ...rawOptions, name: 'app-3', anchorName: 'anchor-1', ui: 'none' })

      const app0 = readProjectConfiguration(tree, options.webName)
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
      await applicationReactGenerator(tree, { ...rawOptions, ui: 'none', anchor: 'none' })
      const projects = getProjects(tree)
      const appProject = projects.has(options.webName)
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()
    })

    it('should generate app using the webName property', async () => {
      await applicationReactGenerator(tree, { ...rawOptions, webName: 'web-app', ui: 'none', anchor: 'none' })
      const projects = getProjects(tree)
      const appProject = projects.has('web-app')
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()
    })
  })
})
