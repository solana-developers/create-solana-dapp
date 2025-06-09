import { log } from '@clack/prompts'
import { join } from 'node:path'
import { Template } from '../templates/templates'
import { ensureTargetPath } from './ensure-target-path'
import { deleteInitScript, getInitScript, InitScript } from './get-init-script'
import { initCheckVersion } from './init-check-version'
import { searchAndReplace } from './search-and-replace'
import { Task, taskFail } from './vendor/clack-tasks'
import { namesValues } from './vendor/names'
import { PackageManager } from './vendor/package-manager'

export interface CreateAppTaskRunInitScriptOptions {
  dryRun: boolean
  name: string
  packageManager: PackageManager
  skipInit: boolean
  targetDirectory: string
  template: Template
  verbose: boolean
}

export function createAppTaskRunInitScript({
  dryRun,
  name,
  packageManager,
  skipInit,
  targetDirectory,
  template,
  verbose,
}: CreateAppTaskRunInitScriptOptions): Task {
  return {
    enabled: !skipInit,
    title: 'Running init script',
    task: async (result) => {
      try {
        const init = getInitScript(targetDirectory)
        if (!init) {
          return result({ message: 'Repository does not have an init script' })
        }
        if (verbose) {
          log.warn(`Running init script`)
        }

        await initCheckVersion(init)
        if (verbose) {
          log.warn(`initCheckVersion done`)
        }
        await initRename({ dryRun, init, name, targetDirectory, template, verbose })
        if (verbose) {
          log.warn(`initRename done`)
        }

        const instructions: string[] = (initInstructions(init) ?? [])
          ?.filter(Boolean)
          .map((msg) => msg.replace('{pm}', packageManager))

        if (verbose) {
          log.warn(`initInstructions done`)
        }
        deleteInitScript(targetDirectory)
        if (verbose) {
          log.warn(`deleteInitScript done`)
        }
        return result({ message: 'Executed init script', instructions })
      } catch (error) {
        taskFail(`init: Error running init script: ${error}`)
      }
    },
  }
}

async function initRename({
  dryRun,
  init,
  name,
  targetDirectory,
  template,
  verbose,
}: {
  dryRun: boolean
  init: InitScript
  name: string
  targetDirectory: string
  template: Template
  verbose: boolean
}) {
  // Rename template to project name throughout the whole project
  await searchAndReplace(targetDirectory, [`template-${template.name}`, template.name], [name, name], false, verbose)

  // Return early if there are no renames defined in the init script
  if (!init?.rename) {
    return
  }

  // Loop through each word in the rename object
  for (const from of Object.keys(init.rename)) {
    // Get the 'to' property from the rename object
    const to = init.rename[from].to.replace('{{name}}', name.replace(/-/g, ''))

    // Get the name matrix for the 'from' and the 'to' value
    const fromNames = namesValues(from)
    const toNames = namesValues(to)

    for (const path of init.rename[from].paths) {
      const targetPath = join(targetDirectory, path)
      if (!(await ensureTargetPath(targetPath))) {
        console.error(`init-script.rename: target does not exist ${targetPath}`)
        continue
      }
      await searchAndReplace(join(targetDirectory, path), fromNames, toNames, dryRun)
    }
  }
}

function initInstructions(init: InitScript) {
  return init?.instructions?.length === 0 ? [] : init?.instructions
}
