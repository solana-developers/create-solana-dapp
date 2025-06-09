import { log } from '@clack/prompts'
import { downloadTemplate } from 'giget'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'
import { Template } from '../templates/templates'
import { Task, taskFail } from './vendor/clack-tasks'

export interface CreateAppTaskCloneTemplateOptions {
  targetDirectory: string
  template: Template
  verbose: boolean
}

export function createAppTaskCloneTemplate({
  targetDirectory,
  template,
  verbose,
}: CreateAppTaskCloneTemplateOptions): Task {
  return {
    title: 'Cloning template',
    task: async (result) => {
      const exists = existsSync(targetDirectory)

      if (exists) {
        taskFail(`Target directory ${targetDirectory} already exists`)
      }
      if (!template.repository) {
        taskFail('No template repository specified')
      }
      if (verbose) {
        log.warn(`Cloning template ${template.repository} to ${targetDirectory}`)
      }
      try {
        const { dir } = await downloadTemplate(template.repository, {
          dir: targetDirectory,
        })
        // make sure the dir is not empty
        const files = await readdir(dir)
        if (files.length === 0) {
          taskFail(`The template directory is empty. Please check the repository: ${template.repository}`)
          return
        }

        return result({ message: `Cloned template to ${dir}` })
      } catch (error) {
        taskFail(`init: Error cloning the template: ${error}`)
      }
    },
  }
}
