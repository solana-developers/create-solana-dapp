import { cancel, log, note, outro } from '@clack/prompts'
import * as process from 'node:process'
import { createApp } from './utils/create-app'
import { finalNote } from './utils/final-note'
import { getAppInfo } from './utils/get-app-info'
import { getGeneratorContext } from './utils/get-generator-context'
import { detectInvokedPackageManager } from './utils/vendor/package-manager'

export async function main(argv: string[]) {
  // Get the invoked package manager
  const pm = detectInvokedPackageManager()

  // Get app info from package.json
  const app = getAppInfo()

  try {
    // Create the context based on the arguments and prompts
    const context = await getGeneratorContext({ app, argv, pm })

    if (context.dryRun) {
      note(JSON.stringify(context, undefined, 2), 'Context')
      outro('🚀 Dry run was used, no changes were made')
      return
    }

    if (context.verbose) {
      log.warn(`Verbose output enabled`)
      console.warn(context)
    }

    // Create the app
    const instructions = await createApp(context)

    note(
      finalNote({ ...context, target: context.targetDirectory.replace(process.cwd(), '.'), instructions }),
      'Installation successful',
    )

    outro('Good luck with your project!')
  } catch (error) {
    cancel(`${error}`)
    process.exit(1)
  }
}
