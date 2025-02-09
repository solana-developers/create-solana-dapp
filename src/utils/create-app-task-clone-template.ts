import { log } from '@clack/prompts'
import { downloadTemplate } from 'giget'
import { existsSync } from 'node:fs'
import { GetArgsResult } from './get-args-result'
import { Task, taskFail } from './vendor/clack-tasks'

export function createAppTaskCloneTemplate(args: GetArgsResult): Task {
  return {
    title: 'Cloning template',
    task: async (result) => {
      const exists = existsSync(args.targetDirectory)

      if (exists) {
        taskFail(`Target directory ${args.targetDirectory} already exists`)
      }
      if (!args.template.repository) {
        taskFail('No template repository specified')
      }
      if (args.verbose) {
        log.warn(`Cloning template ${args.template.repository} to ${args.targetDirectory}`)
      }
      const { dir } = await downloadTemplate(args.template.repository, {
        dir: args.targetDirectory,
      })
      return result({ message: `Cloned template to ${dir}` })
    },
  }
}
