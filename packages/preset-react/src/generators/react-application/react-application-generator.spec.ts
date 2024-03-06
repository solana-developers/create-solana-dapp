import { getProjects, readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import { ReactApplicationUi, normalizeReactApplicationSchema, NormalizedReactApplicationSchema } from '../../utils'

import { reactApplicationGenerator } from './react-application-generator'
import { reactApplicationGeneratorFixtures } from './react-application-generator.fixtures'
import { ReactApplicationSchema } from './react-application-schema'

describe('react-application generator', () => {
  let tree: Tree
  const rawOptions: ReactApplicationSchema = { name: 'test-app', anchor: 'counter', anchorProgram: 'my-program' }
  const options: NormalizedReactApplicationSchema = normalizeReactApplicationSchema(rawOptions)
  process.env['USER'] = 'test'
  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  describe('default apps', () => {
    it.each([['none'], ['tailwind']])('should generate default app with "%s" ui', async (ui) => {
      await reactApplicationGenerator(
        tree,
        { ...rawOptions, ui: ui as ReactApplicationUi },
        reactApplicationGeneratorFixtures,
      )

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
      await reactApplicationGenerator(tree, { ...rawOptions, ui: 'none' }, reactApplicationGeneratorFixtures)
      await reactApplicationGenerator(
        tree,
        { ...rawOptions, name: 'app-1', ui: 'none' },
        reactApplicationGeneratorFixtures,
      )
      await reactApplicationGenerator(
        tree,
        { ...rawOptions, name: 'app-2', ui: 'none' },
        reactApplicationGeneratorFixtures,
      )
      await reactApplicationGenerator(
        tree,
        { ...rawOptions, name: 'app-3', anchorName: 'anchor-1', ui: 'none' },
        reactApplicationGeneratorFixtures,
      )

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
      await reactApplicationGenerator(
        tree,
        { ...rawOptions, ui: 'none', anchor: 'none' },
        reactApplicationGeneratorFixtures,
      )
      const projects = getProjects(tree)
      const appProject = projects.has(options.webName)
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()

      const contents = getRecursiveFileContents(tree, '.')
      expect(contents).toMatchSnapshot()
    })

    it('should generate app using the webName property', async () => {
      await reactApplicationGenerator(
        tree,
        { ...rawOptions, webName: 'web-app', ui: 'none', anchor: 'none' },
        reactApplicationGeneratorFixtures,
      )
      const projects = getProjects(tree)
      const appProject = projects.has('web-app')
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()
    })
  })
})
