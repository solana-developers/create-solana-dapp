import { log } from '@clack/prompts'
import { Framework, frameworks } from './frameworks'

export const templates = getTemplatesForFrameworks(frameworks)

export interface Template {
  name: string
  description: string
  repository: string
  path?: string
}

function getTemplatesForFrameworks(frameworks: Framework[] = []): Template[] {
  return frameworks.reduce((acc, item) => {
    return [...acc, ...getTemplatesForFramework(item)]
  }, [] as Template[])
}

export function getTemplatesForFramework(framework: Framework): Template[] {
  return (
    framework.templates
      // Normalize the template repository
      .map((template) => ({
        ...template,
        repository: template.repository.replace('{{name}}', template.name),
        path: template.path ?? '/',
      }))
  )
}

export function listTemplates() {
  for (const template of templates) {
    log.info(`${template.name}: \n\n\t${template.description}\n\t${template.repository}`)
  }
}
