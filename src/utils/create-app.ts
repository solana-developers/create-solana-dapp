import { Template } from '../templates/templates'
import { createAppTaskCloneTemplate } from './create-app-task-clone-template'
import { createAppTaskInitializeGit } from './create-app-task-initialize-git'
import { createAppTaskInstallDependencies } from './create-app-task-install-dependencies'
import { createAppTaskRunInitScript } from './create-app-task-run-init-script'
import { tasks } from './vendor/clack-tasks'
import { PackageManager } from './vendor/package-manager'

export interface CreateAppOptions {
  dryRun: boolean
  name: string
  packageManager: PackageManager
  skipGit: boolean
  skipInit: boolean
  skipInstall: boolean
  targetDirectory: string
  template: Template
  verbose: boolean
}

export async function createApp({
  dryRun,
  name,
  packageManager,
  skipGit,
  skipInit,
  skipInstall,
  targetDirectory,
  template,
  verbose,
}: CreateAppOptions) {
  return tasks([
    // Clone the template to the target directory
    createAppTaskCloneTemplate({ targetDirectory, template, verbose }),
    // Install the dependencies
    createAppTaskInstallDependencies({ packageManager, skipInstall, targetDirectory, verbose }),
    // Run the init script define in package.json .init property
    createAppTaskRunInitScript({ dryRun, name, packageManager, skipInit, targetDirectory, template, verbose }),
    // Initialize git repository
    createAppTaskInitializeGit({ skipGit, targetDirectory, verbose }),
  ])
}
