import { log } from '@clack/prompts'
import { join } from 'node:path'
import { ensureTargetPath } from './ensure-target-path'
import { GetArgsResult } from './get-args-result'
import { InitScriptRename } from './get-init-script'
import { searchAndReplace } from './search-and-replace'
import { namesValues } from './vendor/names'

export async function initScriptRename(args: GetArgsResult, rename?: InitScriptRename) {
  // Rename template to project name throughout the whole project
  if (args.verbose) {
    log.warn(`initRename: renaming template name to project name`)
  }
  await searchAndReplace(
    args.targetDirectory,
    [`template-${args.template.name}`, args.template.name],
    [args.name, args.name],
    false,
    args.verbose,
  )

  // Return early if there are no renames defined in the init script
  if (!rename) {
    if (args.verbose) {
      log.warn(`initRename: no renames found`)
    }
    return
  }

  // Loop through each word in the rename object
  for (const from of Object.keys(rename)) {
    // Get the 'to' property from the rename object
    const to = rename[from].to.replace('{{name}}', args.name.replace(/-/g, ''))

    // Get the name matrix for the 'from' and the 'to' value
    const fromNames = namesValues(from)
    const toNames = namesValues(to)

    for (const path of rename[from].paths) {
      const targetPath = join(args.targetDirectory, path)
      if (!(await ensureTargetPath(targetPath))) {
        console.error(`init-script.rename: target does not exist ${targetPath}`)
        continue
      }
      if (args.verbose) {
        log.warn(`initRename: ${targetPath} -> ${fromNames.join('|')} -> ${toNames.join('|')}`)
      }
      await searchAndReplace(targetPath, fromNames, toNames, args.dryRun)
    }
  }

  if (args.verbose) {
    log.warn(`initRename done`)
  }
}
