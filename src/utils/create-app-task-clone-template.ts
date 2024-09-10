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
      const { dir } = await downloadTemplate(args.template.repository, {
        dir: args.targetDirectory,
      })
      return result({ message: `Cloned template to ${dir}` })
    },
  }
}
