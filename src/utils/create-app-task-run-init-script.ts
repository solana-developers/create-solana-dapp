import { log } from '@clack/prompts'
import { GetArgsResult } from './get-args-result'
import { getInitScript } from './get-init-script'
import { initScriptDelete } from './init-script-delete'
import { initScriptInstructions } from './init-script-instructions'
import { initScriptRename } from './init-script-rename'
import { initScriptVersion } from './init-script-version'
import { Task, taskFail } from './vendor/clack-tasks'

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

        await initScriptVersion(init.versions, args.verbose)
        if (args.verbose) {
          log.warn(`initCheckVersion done`)
        }
        await initScriptRename(args, init.rename)
        if (args.verbose) {
          log.warn(`initRename done`)
        }

        const instructions: string[] = initScriptInstructions(init.instructions, args.verbose)
          ?.filter(Boolean)
          .map((msg) => msg.replace('{pm}', args.packageManager))

        initScriptDelete(args)
        return result({ message: 'Executed init script', instructions })
      } catch (error) {
        taskFail(`init: Error running init script: ${error}`)
      }
    },
  }
}
