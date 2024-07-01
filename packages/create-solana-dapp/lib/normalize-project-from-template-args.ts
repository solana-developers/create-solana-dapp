import { CreateProjectFromTemplateArgs } from './create-project-from-template'
import { GetArgsResult } from './get-args-result'

export function normalizeProjectFromTemplateArgs({
  name: target,
  preset: url,
  path,
  packageManager,
}: GetArgsResult): CreateProjectFromTemplateArgs {
  return {
    target,
    path,
    packageManager,
    url: url.startsWith('http') ? url : `https://github.com/${url}`,
  }
}
