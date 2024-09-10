import { log } from '@clack/prompts'
import { GetArgsResult } from './get-args-result'
import { Task } from './vendor/clack-tasks'
import { initializeGitRepo } from './vendor/git'

export function createAppTaskInitializeGit(args: GetArgsResult): Task {
  return {
    enabled: !args.skipGit,
    title: 'Initializing git',
    task: async (result) => {
      try {
        await initializeGitRepo(args.targetDirectory, {
          commit: { email: '', name: '', message: 'chore: initial commit' },
        })
        return result({ message: 'Initialized git repo' })
      } catch (error) {
        log.error(`${error}`)
      }
    },
  }
}
