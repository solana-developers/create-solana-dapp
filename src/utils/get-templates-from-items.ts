import { MenuItem, TemplateJsonTemplate } from '@beeman/repokit'
import { log } from '@clack/prompts'
import pico from 'picocolors'

export function getTemplatesFromItems({
  items,
  verbose,
}: {
  items: MenuItem[]
  verbose: boolean
}): TemplateJsonTemplate[] {
  const templates = items?.flatMap((i) => i.templates)
  if (verbose) {
    log.warning(
      `Got ${templates.length} templates:\n- ${templates.map((t) => `${pico.cyan(t.name)} (${pico.gray(t.id)})`).join('\n- ')}`,
    )
  }
  return templates
}
