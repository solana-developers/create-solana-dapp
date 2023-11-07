#!/usr/bin/env node
import { intro, note, outro } from '@clack/prompts'
import { createWorkspace } from 'create-nx-workspace'
import { app, getArgs } from '../lib/get-args'

async function main() {
  intro(`${app.name} ${app.version}`)
  const args = await getArgs()

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
      withAnchor: args.anchor,
      anchorName: args.anchorName,
      anchorTemplate: args.anchorTemplate,
      appName: args.appName,
    })

    note(`Successfully created the workspace: ${directory}.`)
    outro(`Run \`cd ${directory}\` to get started.`)
  } else {
    note('Dry run, no changes were made.')
    note(JSON.stringify(args, null, 2))
    outro(`Would have created the workspace: ${args.name} with preset: ${args.preset}.`)
  }
}

main()
