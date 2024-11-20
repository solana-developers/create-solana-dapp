import { log } from '@clack/prompts'
import { join } from 'node:path'
import { bold, yellow } from 'picocolors'
import { ensureTargetPath } from './ensure-target-path'
import { GetArgsResult } from './get-args-result'
import { deleteInitScript, getInitScript, InitScript } from './get-init-script'
import { searchAndReplace } from './search-and-replace'
import { validateAnchorVersion, validateSolanaVersion } from './validate-version'
import { Task, taskFail } from './vendor/clack-tasks'
import { namesValues } from './vendor/names'

export function createAppTaskRunInitScript(args: GetArgsResult): Task {
  return {
    enabled: !args.skipInit,
    title: 'Running init script',
    task: async (result) => {
      try {
        const init = getInitScript(args.targetDirectory)
        if (!init) {
          return result({ message: 'Repository does not have an init script' })
        }

        await initCheckVersion(init)
        await initRename(args, init)

        const instructions: string[] = (initInstructions(init) ?? [])
          ?.filter(Boolean)
          .map((msg) => msg.replace('{pm}', args.packageManager))

        deleteInitScript(args.targetDirectory)
        return result({ message: 'Executed init script!', instructions })
      } catch (error) {
        taskFail(`${error}`)
      }
    },
  }
}

async function initRename(args: GetArgsResult, init: InitScript) {
  // Rename template to project name throughout the whole project
  await searchAndReplace(
    args.targetDirectory,
    [`template-${args.template.name}`, args.template.name],
    [args.name, args.name],
    false,
  )

  // Return early if there are no renames defined in the init script
  if (!init?.rename) {
    return
  }

  // Loop through each word in the rename object
  for (const from of Object.keys(init.rename)) {
    // Get the 'to' property from the rename object
    const to = init.rename[from].to.replace('{{name}}', args.name.replace(/-/g, ''))

    // Get the name matrix for the 'from' and the 'to' value
    const fromNames = namesValues(from)
    const toNames = namesValues(to)

    for (const path of init.rename[from].paths) {
      const targetPath = join(args.targetDirectory, path)
      if (!(await ensureTargetPath(targetPath))) {
        console.error(`init-script.rename: target does not exist ${targetPath}`)
        continue
      }
      await searchAndReplace(join(args.targetDirectory, path), fromNames, toNames, args.dryRun)
    }
  }
}

async function initCheckVersion(init: InitScript) {
  if (init?.versions?.anchor) {
    await initCheckVersionAnchor(init.versions.anchor)
  }
  if (init?.versions?.solana) {
    await initCheckVersionSolana(init.versions.solana)
  }
}

async function initCheckVersionAnchor(requiredVersion: string) {
  try {
    const { required, valid, version } = validateAnchorVersion(requiredVersion)
    if (!version) {
      log.warn(
        [
          bold(yellow(`Could not find Anchor version. Please install Anchor.`)),
          'https://www.anchor-lang.com/docs/installation',
        ].join(' '),
      )
    } else if (!valid) {
      log.warn(
        [
          yellow(`Found Anchor version ${version}. Expected Anchor version ${required}.`),
          'https://www.anchor-lang.com/release-notes/0.30.1',
        ].join(' '),
      )
    }
  } catch (error_) {
    log.warn(`Error ${error_}`)
  }
}

async function initCheckVersionSolana(requiredVersion: string) {
  try {
    const { required, valid, version } = validateSolanaVersion(requiredVersion)
    if (!version) {
      log.warn(
        [
          bold(yellow(`Could not find Solana version. Please install Solana.`)),
          'https://docs.solana.com/cli/install-solana-cli-tools',
        ].join(' '),
      )
    } else if (!valid) {
      log.warn(
        [
          yellow(`Found Solana version ${version}. Expected Solana version ${required}.`),
          'https://docs.solana.com/cli/install-solana-cli-tools',
        ].join(' '),
      )
    }
  } catch (error_) {
    log.warn(`Error ${error_}`)
  }
}

function initInstructions(init: InitScript) {
  return init?.instructions?.length === 0 ? [] : init?.instructions
}
