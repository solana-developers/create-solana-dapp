import { cancel, group } from '@clack/prompts'
import * as process from 'node:process'
import { Template } from '../templates/templates'
import { getPromptName } from './get-prompt-name'
import { getPromptTemplate } from './get-prompt-template'

export function getPrompts({ name, template }: { name: string; template?: Template }) {
  return group(
    {
      name: getPromptName({ name }),
      template: getPromptTemplate({ template }),
    },
    {
      onCancel: () => {
        cancel('Operation cancelled.')
        process.exit(1)
      },
    },
  )
}
