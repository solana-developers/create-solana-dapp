import { log } from '@clack/prompts'
import { join } from 'node:path'
import { ensureTargetPath } from './ensure-target-path'
import { GetArgsResult } from './get-args-result'
import { deleteInitScript, getInitScript, InitScript } from './get-init-script'
import { getPackageJson } from './get-package-json'
import { initCheckVersion } from './init-check-version'
import { searchAndReplace } from './search-and-replace'
import { Task, taskFail } from './vendor/clack-tasks'
import { namesValues } from './vendor/names'

export function createAppTaskRunInitScript(args: GetArgsResult): Task {
  return {
    enabled: !args.skipInit,
    title: 'Running init script',
    task: async (result) => {
      try {
        const init = getInitScript(args.targetDirectory)
        if (!init) {
          return result({ message: 'Repository does not have an init script' })
        }
        if (args.verbose) {
          log.warn(`Running init script`)
        }

        await initCheckVersion(init)
        if (args.verbose) {
          log.warn(`initCheckVersion done`)
        }
        await initRename(args, init, args.verbose)
        if (args.verbose) {
          log.warn(`initRename done`)
        }

        const instructions: string[] = (initInstructions(init) ?? [])
          ?.filter(Boolean)
          .map((msg) => msg.replace('{pm}', args.packageManager))

        if (args.verbose) {
          log.warn(`initInstructions done`)
        }
        deleteInitScript(args.targetDirectory)
        if (args.verbose) {
          log.warn(`deleteInitScript done`)
        }
        return result({ message: 'Executed init script', instructions })
      } catch (error) {
        taskFail(`init: Error running init script: ${error}`)
      }
    },
  }
}

async function initRename(args: GetArgsResult, init: InitScript, verbose: boolean) {
  const { contents } = getPackageJson(args.targetDirectory)
  // Rename template from package.json to project name throughout the whole project
  if (contents.name) {
    await searchAndReplace(args.targetDirectory, [contents.name], [args.name], false, verbose)
  }

  // Return early if there are no renames defined in the init script
  if (!init?.rename) {
    return
  }

  // Loop through each word in the rename object
  for (const from of Object.keys(init.rename)) {
    // Get the 'to' property from the rename object
    const to = init.rename[from].to.replace('{{name}}', args.name.replace(/-/g, ''))

    // Get the name matrix for the 'from' and the 'to' value
    const fromNames = namesValues(from)
    const toNames = namesValues(to)

    for (const path of init.rename[from].paths) {
      const targetPath = join(args.targetDirectory, path)
      if (!(await ensureTargetPath(targetPath))) {
        console.error(`init-script.rename: target does not exist ${targetPath}`)
        continue
      }
      await searchAndReplace(join(args.targetDirectory, path), fromNames, toNames, args.dryRun)
    }
  }
}

function initInstructions(init: InitScript) {
  return init?.instructions?.length === 0 ? [] : init?.instructions
}
