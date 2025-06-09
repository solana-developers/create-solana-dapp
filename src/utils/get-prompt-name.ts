import { log, text } from '@clack/prompts'
import { validateProjectName } from './validate-project-name'

export function getPromptName({ name }: { name: string }) {
  return () => {
    if (name?.length) {
      log.success(`Project name: ${name}`)
      return Promise.resolve(name)
    }
    return text({
      message: 'Enter project name',
      validate: validateProjectName,
    })
  }
}
