import { log } from '@clack/prompts'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { execAndWait } from './vendor/child-process-utils'
import { Task, taskFail } from './vendor/clack-tasks'
import { getPackageManagerCommand, PackageManager } from './vendor/package-manager'

export interface CreateAppTaskInstallDependenciesOptions {
  packageManager: PackageManager
  skipInstall: boolean
  targetDirectory: string
  verbose: boolean
}

export function createAppTaskInstallDependencies({
  packageManager,
  skipInstall,
  targetDirectory,
  verbose,
}: CreateAppTaskInstallDependenciesOptions): Task {
  const { install, lockFile } = getPackageManagerCommand(packageManager, verbose)
  return {
    enabled: !skipInstall,
    title: `Installing via ${packageManager}`,
    task: async (result) => {
      if (verbose) {
        log.warn(`Installing via ${packageManager}`)
      }
      const deleteLockFiles = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']
        // We don't want to delete the lock file for the current package manager
        .filter((item) => item !== lockFile)
        // We only want to delete the lock file if it exists
        .filter((item) => existsSync(join(targetDirectory, item)))

      for (const lockFile of deleteLockFiles) {
        if (verbose) {
          log.warn(`Deleting ${lockFile}`)
        }
        await execAndWait(`rm ${lockFile}`, targetDirectory)
      }
      if (verbose) {
        log.warn(`Running ${install}`)
      }
      try {
        await execAndWait(install, targetDirectory)
        return result({ message: `Installed via ${packageManager}` })
      } catch (error) {
        taskFail(`init: Error installing dependencies: ${error}`)
      }
    },
  }
}
