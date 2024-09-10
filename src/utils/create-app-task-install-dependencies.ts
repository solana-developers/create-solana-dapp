import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { GetArgsResult } from './get-args-result'
import { execAndWait } from './vendor/child-process-utils'
import { Task } from './vendor/clack-tasks'
import { getPackageManagerCommand } from './vendor/package-manager'

export function createAppTaskInstallDependencies(args: GetArgsResult): Task {
  const pm = args.packageManager
  const { install, lockFile } = getPackageManagerCommand(pm)
  return {
    enabled: !args.skipInstall,
    title: `Installing via ${pm}`,
    task: async (result) => {
      const deleteLockFiles = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock']
        // We don't want to delete the lock file for the current package manager
        .filter((item) => item !== lockFile)
        // We only want to delete the lock file if it exists
        .filter((item) => existsSync(join(args.targetDirectory, item)))

      for (const lockFile of deleteLockFiles) {
        await execAndWait(`rm ${lockFile}`, args.targetDirectory)
      }

      await execAndWait(install, args.targetDirectory)

      return result({ message: `Installed via ${pm}` })
    },
  }
}
