import { log } from '@clack/prompts'
import { Task, taskFail } from './vendor/clack-tasks'
import { initializeGitRepo } from './vendor/git'

export interface CreateAppTaskInitializeGitOptions {
  skipGit: boolean
  targetDirectory: string
  verbose: boolean
}

export function createAppTaskInitializeGit({
  skipGit,
  targetDirectory,
  verbose,
}: CreateAppTaskInitializeGitOptions): Task {
  return {
    enabled: !skipGit,
    title: 'Initializing git',
    task: async (result) => {
      try {
        if (verbose) {
          log.warn(`Initializing git repo`)
        }
        await initializeGitRepo(targetDirectory, {
          commit: { email: '', name: '', message: 'chore: initial commit' },
        })
        return result({ message: 'Initialized git repo' })
      } catch (error) {
        if (verbose) {
          log.error(`Error initializing git repo: ${error}`)
          console.error(error)
        }
        log.error(`${error}`)
        taskFail(`init: Error initializing git: ${error}`)
      }
    },
  }
}
