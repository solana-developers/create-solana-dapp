import { spinner } from '@clack/prompts'
import { existsSync } from 'fs'
import { ensureGitRepo, gitClone } from './git-helpers'
import { installPackages, PackageManager } from './nx-helpers'
import { tmpdir } from 'node:os'
import { join } from 'path'
import { copy } from 'nx/src/native'
import { initializeGitRepo } from 'create-nx-workspace/src/utils/git/git'

export interface CreateProjectFromTemplateArgs {
  target: string
  path: string
  packageManager: PackageManager
  url: string
}

export async function createProjectFromTemplate({ target, packageManager, path, url }: CreateProjectFromTemplateArgs) {
  // Make sure the target doesn't already exist
  const exists = existsSync(target)
  if (exists) {
    throw new Error(`Directory already exists: ${target}`)
  }
  // Make sure we get the git repo info
  const info = await ensureGitRepo(url)
  if (!info) {
    throw new Error(`Could not get git repo info for template: ${url}`)
  }
  const branch = info.HEAD?.replace('refs/heads/', '')

  const s = spinner()
  s.start(`Cloning template from ${url} to ${target}`)

  if (path.length) {
    const tempDir = tmpdir()
    await gitClone({ branch, target: tempDir, url })
    copy(join(tempDir, path), target)
  } else {
    await gitClone({ branch, target, url })
  }
  s.stop(`Cloned template from ${url} to ${target}`)

  s.start(`Installing dependencies with ${packageManager}`)
  await installPackages(target, packageManager)
  s.stop(`Installed dependencies with ${packageManager}`)

  await initializeGitRepo(target, {
    defaultBase: 'main',
    commit: { name: '', email: '', message: 'chore: initial commit' },
  })
  return { directory: target }
}
