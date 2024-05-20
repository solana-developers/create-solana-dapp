import { log, spinner } from '@clack/prompts'
import { execAndWait } from 'create-nx-workspace/src/utils/child-process-utils'
import { join } from 'node:path'
import { customCreateWorkspace } from './custom-create-workspace'
import { GetArgsResult } from './get-args-result'

export async function createProjectFromPreset(args: GetArgsResult) {
  const { directory } = await customCreateWorkspace(
    `${args.package}`,
    {
      anchor: args.anchor,
      anchorName: args.anchorName,
      anchorProgram: args.anchorProgram,
      commit: {
        name: '',
        email: '',
        message: 'chore: initial commit',
      },
      dryRun: args.dryRun,
      name: args.name,
      nxCloud: 'skip',
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
  return { directory }
}
