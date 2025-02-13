import { log } from '@clack/prompts'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { GetArgsResult } from './get-args-result'
import { execAndWait } from './vendor/child-process-utils'
import { Task, taskFail } from './vendor/clack-tasks'
import { getPackageManagerCommand } from './vendor/package-manager'

export function createAppTaskInstallDependencies(args: GetArgsResult): Task {
  const pm = args.packageManager
  const { install, lockFile } = getPackageManagerCommand(pm)
  return {
    enabled: !args.skipInstall,
    title: `Installing via ${pm}`,
    task: async (result) => {
      if (args.verbose) {
        log.warn(`Installing via ${pm}`)
      }
      const deleteLockFiles = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']
        // We don't want to delete the lock file for the current package manager
        .filter((item) => item !== lockFile)
        // We only want to delete the lock file if it exists
        .filter((item) => existsSync(join(args.targetDirectory, item)))

      for (const lockFile of deleteLockFiles) {
        if (args.verbose) {
          log.warn(`Deleting ${lockFile}`)
        }
        await execAndWait(`rm ${lockFile}`, args.targetDirectory)
      }
      if (args.verbose) {
        log.warn(`Running ${install}`)
      }
      try {
        await execAndWait(install, args.targetDirectory)
        return result({ message: `Installed via ${pm}` })
      } catch (error) {
        taskFail(`init: Error installing dependencies: ${error}`)
      }
    },
  }
}
