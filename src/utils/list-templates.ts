import { TemplateJsonTemplate } from '@beeman/repokit'
import { log } from '@clack/prompts'

export function listTemplates({ templates }: { templates: TemplateJsonTemplate[] }) {
  for (const template of templates) {
    log.info(`${template.name}: \n\n\t${template.description}\n\t${template.id}`)
  }
}
