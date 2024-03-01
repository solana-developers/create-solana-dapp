import { execSync } from 'child_process'
import { mkdirSync, rmSync } from 'fs'
import { dirname, join, relative } from 'path'
import * as process from 'process'
import { logger } from './logger'

/**
 * Creates a test project with create-nx-workspace and installs the plugin
 * @returns The directory where the test project was created
 */
export function createTestProject(projectName: string) {
  const projectDirectory = join(process.cwd(), 'tmp', projectName)

  // Ensure projectDirectory is empty
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  })
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  })

  execSync(
    `npx --yes create-nx-workspace@latest ${projectName} --preset apps --nxCloud skip --no-interactive --package-manager pnpm`,
    {
      cwd: dirname(projectDirectory),
      stdio: 'inherit',
      env: process.env,
    },
  )

  const relativeProjectDirectory = relative(process.cwd(), projectDirectory)

  logger.log(`Created test project ${projectName} in "${relativeProjectDirectory}"`)
  return projectDirectory
}
