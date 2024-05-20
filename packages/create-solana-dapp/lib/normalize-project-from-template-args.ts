import { CreateProjectFromTemplateArgs } from './create-project-from-template'
import { GetArgsResult } from './get-args-result'

export function normalizeProjectFromTemplateArgs({
  name: directory,
  preset: url,
  packageManager,
}: GetArgsResult): CreateProjectFromTemplateArgs {
  return {
    directory,
    packageManager,
    url: url.startsWith('http') ? url : `https://github.com/${url}`,
  }
}
