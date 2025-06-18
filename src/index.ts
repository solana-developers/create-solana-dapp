import { cancel, log, note, outro } from '@clack/prompts'
import * as process from 'node:process'
import { checkCliVersion } from './utils/check-cli-version'
import { createApp } from './utils/create-app'
import { finalNote } from './utils/final-note'
import { getAppInfo } from './utils/get-app-info'
import { getArgs } from './utils/get-args'
import { detectInvokedPackageManager } from './utils/vendor/package-manager'

export async function main(argv: string[]) {
  // Get the invoked package manager
  const pm = detectInvokedPackageManager()

  // Get app info from package.json
  const app = getAppInfo()

  try {
    // Get the result from the command line and prompts
    const args = await getArgs(argv, app, pm)

    // Check CLI version and block if outdated (unless skipped)
    // This ensures users always get the latest templates and features
    if (!args.skipVersionCheck) {
      await checkCliVersion(app, {
        blockOnOutdated: true, // Default behavior: block execution if outdated
        verbose: args.verbose,
      })
    }

    if (args.dryRun) {
      note(JSON.stringify(args, undefined, 2), 'Arguments')
      outro('🚀 Dry run was used, no changes were made')
      return
    }

    if (args.verbose) {
      log.warn(`Verbose output enabled`)
      console.warn(args)
    }

    // Create the app
    const instructions = await createApp(args)

    note(
      finalNote({ ...args, target: args.targetDirectory.replace(process.cwd(), '.'), instructions }),
      'Installation successful',
    )

    outro('Good luck with your project!')
  } catch (error) {
    cancel(`${error}`)
    process.exit(1)
  }
}
