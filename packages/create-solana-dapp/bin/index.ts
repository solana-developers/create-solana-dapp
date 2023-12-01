#!/usr/bin/env node
import { log, note, outro, spinner } from '@clack/prompts'
import { execAndWait } from 'create-nx-workspace/src/utils/child-process-utils'
import { detectInvokedPackageManager } from 'create-nx-workspace/src/utils/package-manager'
import { join } from 'node:path'
import { customCreateWorkspace } from '../lib/custom-create-workspace'
import { getArgs } from '../lib/get-args'

async function main() {
  const pm = detectInvokedPackageManager()
  const args = await getArgs(process.argv, pm)

  if (!args.dryRun) {
    const { directory } = await customCreateWorkspace(
      `${args.package}`,
      {
        anchor: args.anchor,
        anchorName: args.anchorName,
        commit: {
          name: '',
          email: '',
          message: 'chore: initial commit',
        },
        dryRun: args.dryRun,
        name: args.name,
        nxCloud: false,
        packageManager: args.packageManager,
        ui: args.ui,
        webName: args.webName,
        webPort: args.webPort,
      },
      async () => {
        if (args.anchor === 'none' || !args.anchorBuild) {
          return
        }
        const s = spinner()
        s.start('Building anchor...')
        try {
          await execAndWait(`anchor keys sync`, join(args.name, args.anchorName))
          await execAndWait(`npx nx run ${args.anchorName}:build`, join(args.name))
          s.stop('Anchor built.')
        } catch (e) {
          s.stop('Anchor build failed.')
          log.warn('Do you have Rust and Anchor installed?')
        }
      },
    )

    outro(`Run \`cd ${directory.replace(process.cwd(), '.')}\` to get started.`)
  } else {
    note(JSON.stringify(args, null, 2), 'Dry run, no changes were made.')
    outro(`Would have created the workspace: ${args.name} with preset: ${args.preset}.`)
  }
}

main()
