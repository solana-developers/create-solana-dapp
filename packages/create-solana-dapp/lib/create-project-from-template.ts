import { spinner } from '@clack/prompts'
import { existsSync } from 'fs'
import { ensureGitRepo, gitClone } from './git-helpers'
import { installPackages, PackageManager } from './nx-helpers'

export interface CreateProjectFromTemplateArgs {
  directory: string
  packageManager: PackageManager
  url: string
}

export async function createProjectFromTemplate({ directory, packageManager, url }: CreateProjectFromTemplateArgs) {
  // Make sure the directory doesn't already exist
  const exists = existsSync(directory)
  if (exists) {
    throw new Error(`Directory already exists: ${directory}`)
  }
  // Make sure we get the git repo info
  const info = await ensureGitRepo(url)
  if (!info) {
    throw new Error(`Could not get git repo info for template: ${url}`)
  }
  const branch = info.HEAD?.replace('refs/heads/', '')

  const s = spinner()
  s.start(`Cloning template from ${url} to ${directory}`)
  await gitClone({ branch, directory, url })
  s.stop(`Cloned template from ${url} to ${directory}`)

  s.start(`Installing dependencies with ${packageManager}`)
  await installPackages(directory, packageManager)
  s.stop(`Installed dependencies with ${packageManager}`)
  return { directory }
}
