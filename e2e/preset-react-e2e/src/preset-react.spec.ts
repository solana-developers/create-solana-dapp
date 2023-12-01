import { createTestProject, logger } from '@solana-developers/e2e-utils'
import { execSync } from 'child_process'
import { rmSync } from 'fs'

describe('preset-react', () => {
  const cleanUp = process.env['CLEANUP'] !== 'false'
  const packageName = '@solana-developers/preset-react'
  logger.log(`Running tests for ${packageName}`)

  let projectDirectory: string

  beforeAll(() => {
    projectDirectory = createTestProject('preset-react-e2e')

    // The plugin has been built and published to a local registry in the jest globalSetup
    // Install the plugin built with the latest source code into the test repo
    execSync(`npm install ${packageName}@e2e`, {
      cwd: projectDirectory,
      stdio: 'inherit',
      env: process.env,
    })
  })

  afterAll(() => {
    if (!cleanUp) {
      logger.log(`Skipping cleanup of test project "${projectDirectory}"`)
      return
    }
    // Cleanup the test project
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    })
    logger.log(`Cleaned up test project "${projectDirectory}"`)
  })

  it('should be installed', () => {
    // npm ls will fail if the package is not installed properly
    execSync(`npm ls ${packageName}`, {
      cwd: projectDirectory,
      stdio: 'inherit',
    })
    logger.log(`Installed ${packageName}`)
  })

  it('should be run the preset generator with only a name ', () => {
    execSync(`nx g ${packageName}:preset --name my-app --ui tailwind --anchor counter`, {
      cwd: projectDirectory,
      stdio: 'inherit',
    })
    logger.log(`Ran ${packageName}:preset`)
  })
})
