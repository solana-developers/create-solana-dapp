import { output } from '@nx/devkit'
import { execSync } from 'child_process'
import { mkdirSync, rmSync } from 'fs'
import { dirname, join } from 'path'
output.cliName = 'E2E'

describe('preset-react', () => {
  const cleanUp = process.env.CLEANUP !== 'false'
  const packageName = '@solana-developers/preset-react'
  output.log({ title: `Running tests for ${packageName}` })

  let projectDirectory: string

  beforeAll(() => {
    projectDirectory = createTestProject('preset-react-e2e')
    output.log({ title: `Created test project in "${projectDirectory}"` })

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
      output.log({ title: `Skipping cleanup of test project "${projectDirectory}"` })
      return
    }
    // Cleanup the test project
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    })
    output.log({ title: `Cleaned up test project "${projectDirectory}"` })
  })

  it('should be installed', () => {
    // npm ls will fail if the package is not installed properly
    execSync(`npm ls ${packageName}`, {
      cwd: projectDirectory,
      stdio: 'inherit',
    })
    output.log({ title: `Installed ${packageName}` })
  })

  it('should be run the preset generator with only a name ', () => {
    execSync(`nx g ${packageName}:preset --name my-app`, {
      cwd: projectDirectory,
      stdio: 'inherit',
    })
    output.log({ title: `Ran ${packageName}:preset` })
  })
})

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
function createTestProject(projectName: string) {
  const projectDirectory = join(process.cwd(), 'tmp', projectName)

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  })
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  })

  execSync(`npx --yes create-nx-workspace@latest ${projectName} --preset apps --no-nxCloud --no-interactive`, {
    cwd: dirname(projectDirectory),
    stdio: 'inherit',
    env: process.env,
  })
  console.log(`Created test project in "${projectDirectory}"`)

  return projectDirectory
}
