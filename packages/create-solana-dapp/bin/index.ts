#!/usr/bin/env node
import { intro, log, note, outro } from '@clack/prompts'
import { createWorkspace } from 'create-nx-workspace'
import { detectInvokedPackageManager } from 'create-nx-workspace/src/utils/package-manager'
import { getAppInfo } from '../lib/get-app-info'
import { getArgs } from '../lib/get-args'

async function main() {
  const app = getAppInfo()
  intro(`${app.name} ${app.version}`)
  const pm = detectInvokedPackageManager()
  const args = await getArgs(process.argv, pm)

  if (!args.dryRun) {
    log.message(`Creating workspace...\n`)
    const { directory } = await createWorkspace(`${args.package}`, {
      anchor: args.anchor,
      anchorName: args.anchorName,
      appName: args.appName,
      commit: {
        name: 'Solana Developers',
        email: 'no-reply@solana.org',
        message: 'chore: initial commit',
      },
      dryRun: args.dryRun,
      name: args.name,
      nxCloud: false,
      packageManager: args.packageManager,
      ui: args.ui,
    })

    log.success('Workspace created.')
    outro(`Run \`cd ${directory}\` to get started.`)
  } else {
    note(JSON.stringify(args, null, 2), 'Dry run, no changes were made.')
    outro(`Would have created the workspace: ${args.name} with preset: ${args.preset}.`)
  }
}

main()
