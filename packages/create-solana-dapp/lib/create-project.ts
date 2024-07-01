import { createProjectFromPreset } from './create-project-from-preset'
import { createProjectFromTemplate } from './create-project-from-template'
import { GetArgsResult } from './get-args-result'
import { normalizeProjectFromTemplateArgs } from './normalize-project-from-template-args'

export async function createProject(args: GetArgsResult) {
  if (args.isTemplate) {
    return createProjectFromTemplate(normalizeProjectFromTemplateArgs(args))
  }
  return createProjectFromPreset(args)
}
