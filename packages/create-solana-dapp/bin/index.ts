#!/usr/bin/env node
import { intro, note, outro } from '@clack/prompts'
import { createWorkspace } from 'create-nx-workspace'
import { getAppInfo } from '../lib/get-app-info'
import { getArgs } from '../lib/get-args'

async function main() {
  const app = getAppInfo()
  intro(`${app.name} ${app.version}`)
  const args = await getArgs(process.argv)

  if (!args.dryRun) {
    const { directory } = await createWorkspace(`${args.package}`, {
      name: args.name,
      nxCloud: false,
      packageManager: args.packageManager,
      commit: {
        name: 'Solana Developers',
        email: 'no-reply@solana.org',
        message: 'chore: initial commit',
      },
      anchor: args.anchor,
      anchorName: args.anchorName,
      appName: args.appName,
    })

    note(`Successfully created the workspace: ${directory}.`)
    outro(`Run \`cd ${directory}\` to get started.`)
  } else {
    note(JSON.stringify(args, null, 2), 'Dry run, no changes were made.')
    outro(`Would have created the workspace: ${args.name} with preset: ${args.preset}.`)
  }
}

main()
