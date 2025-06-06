import { log } from '@clack/prompts'
import { GetArgsResult } from './get-args-result'
import { getInitScript } from './get-init-script'
import { initScriptCheckVersion } from './init-script-check-version'
import { initScriptDelete } from './init-script-delete'
import { initScriptInstructions } from './init-script-instructions'
import { initScriptRename } from './init-script-rename'
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

        await initScriptCheckVersion(init.versions, args.verbose)
        await initScriptRename(args, init.rename)
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
