import { cancel, group } from '@clack/prompts'
import * as process from 'node:process'
import { GetArgsResult } from './get-args-result'
import { getPromptName } from './get-prompt-name'
import { getPromptTemplate } from './get-prompt-template'

export function getPrompts({ options }: { options: GetArgsResult }) {
  return group(
    {
      name: getPromptName({ options }),
      template: getPromptTemplate({ options }),
    },
    {
      onCancel: () => {
        cancel('Operation cancelled.')
        process.exit(1)
      },
    },
  )
}
