#!/usr/bin/env node
import { log, note, outro } from '@clack/prompts'
import { createProject, finalNote, getArgs } from '../lib'
import { GetArgsResult } from '../lib/get-args-result'
import { detectPackageManager, PackageManager } from '../lib/nx-helpers'

async function main() {
  const pm: PackageManager = detectPackageManager()
  const args: GetArgsResult = await getArgs(process.argv, pm)

  if (!args.dryRun) {
    const { directory } = await createProject(args)
    const target = directory.replace(process.cwd(), '.')
    note(finalNote({ ...args, target }), 'Installation successful!')
  } else {
    note(JSON.stringify(args, null, 2), 'Dry run, no changes were made.')
    note(finalNote({ ...args, target: './dry-run' }), 'Installation successful!')
  }
}

main()
  .then(() => outro('Good luck with your project!'))
  .catch((error) => {
    log.error(error.toString())
    process.exit(1)
  })
