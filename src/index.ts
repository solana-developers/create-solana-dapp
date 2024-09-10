import { note, outro } from '@clack/prompts'
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

  // Get the result from the command line and prompts
  const args = await getArgs(argv, app, pm)

  if (args.dryRun) {
    note(JSON.stringify(args, undefined, 2), 'Arguments')
    outro('🚀 Dry run was used, no changes were made')
    return
  }

  // Create the app
  const instructions = await createApp(args)

  note(
    finalNote({ ...args, target: args.targetDirectory.replace(process.cwd(), '.'), instructions }),
    'Installation successful!',
  )

  outro('Good luck with your project!')
}
