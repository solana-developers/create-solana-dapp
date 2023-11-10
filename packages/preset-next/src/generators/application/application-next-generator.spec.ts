import { getProjects, readProjectConfiguration, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { getRecursiveFileContents } from '@solana-developers/preset-common'
import { ApplicationNextUi, normalizeApplicationNextSchema, NormalizedApplicationNextSchema } from '../../utils'
import { applicationNextGenerator } from './application-next-generator'
import { ApplicationNextSchema } from './application-next-schema'

describe('application generator', () => {
  let tree: Tree
  const rawOptions: ApplicationNextSchema = { name: 'test-app', anchor: 'counter' }
  const options: NormalizedApplicationNextSchema = normalizeApplicationNextSchema(rawOptions)

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  describe('default apps', () => {
    it.each([['none'], ['tailwind']])('should generate default app with "%s" ui', async (ui) => {
      await applicationNextGenerator(tree, { ...rawOptions, ui: ui as ApplicationNextUi })

      const appConfig = readProjectConfiguration(tree, options.appName)
      const anchorConfig = readProjectConfiguration(tree, options.anchorName)
      expect(appConfig).toBeDefined()
      expect(anchorConfig).toBeDefined()

      const contents = getRecursiveFileContents(tree, '.')
      expect(contents).toMatchSnapshot()
    })
  })

  describe('custom apps', () => {
    it('should generate 4 Next apps and 2 Anchor apps', async () => {
      await applicationNextGenerator(tree, { ...rawOptions, ui: 'none' })
      await applicationNextGenerator(tree, { ...rawOptions, name: 'app-1', ui: 'none' })
      await applicationNextGenerator(tree, { ...rawOptions, name: 'app-2', ui: 'none' })
      await applicationNextGenerator(tree, { ...rawOptions, name: 'app-3', anchorName: 'anchor-1', ui: 'none' })

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
      await applicationNextGenerator(tree, { ...rawOptions, ui: 'none', anchor: 'none' })
      const projects = getProjects(tree)
      const appProject = projects.has(options.appName)
      const anchorProject = projects.has(options.anchorName)

      expect(projects.size).toEqual(1)
      expect(appProject).toBeDefined()
      expect(anchorProject).toBeFalsy()
    })

    it.each([['none'], ['tailwind']])('should generate app with custom name and "%s" ui', async (ui) => {
      await applicationNextGenerator(tree, {
        ...rawOptions,
        appName: 'web-app',
        ui: ui as ApplicationNextUi,
        anchor: 'none',
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
