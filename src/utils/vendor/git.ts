/**
 * This file includes portions of code from the 'create-nx-workspace' package.
 * The original code can be found at:
 * https://github.com/nrwl/nx/blob/2c0a50c0d8f45f65c9a91e1426fc2e66a29af3bb/packages/create-nx-workspace/src/utils/git/git.ts
 *
 * This code is licensed under the MIT License:
 * MIT License
 * Copyright (c) 2017-2024 Narwhal Technologies Inc.
 *
 * The full MIT License is available in the LICENSE file at the root of this repository.
 */
import { log } from '@clack/prompts'
import { execSync, spawn, SpawnOptions } from 'node:child_process'

export function checkGitVersion(): string | undefined {
  try {
    const gitVersionOutput = execSync('git --version', { windowsHide: true }).toString().trim()
    return gitVersionOutput.match(/\d+\.\d+\.+\d+/)?.[0]
  } catch {
    return undefined
  }
}

export async function initializeGitRepo(
  directory: string,
  options: {
    defaultBase?: string
    commit?: { message: string; name: string; email: string }
  },
) {
  const execute = (args: ReadonlyArray<string>, ignoreErrorStream = false) => {
    const outputStream = 'ignore'
    const errorStream = ignoreErrorStream ? 'ignore' : process.stderr
    const spawnOptions: SpawnOptions = {
      stdio: [process.stdin, outputStream, errorStream],
      shell: true,
      cwd: directory,
      env: {
        ...process.env,
        ...(options.commit?.name
          ? {
              GIT_AUTHOR_NAME: options.commit.name,
              GIT_COMMITTER_NAME: options.commit.name,
            }
          : {}),
        ...(options.commit?.email
          ? {
              GIT_AUTHOR_EMAIL: options.commit.email,
              GIT_COMMITTER_EMAIL: options.commit.email,
            }
          : {}),
      },
    }
    return new Promise<void>((resolve, reject) => {
      spawn('git', args, spawnOptions).on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(code)
        }
      })
    })
  }
  const gitVersion = checkGitVersion()
  if (!gitVersion) {
    return
  }
  const insideRepo = await execute(['rev-parse', '--is-inside-work-tree'], true).then(
    () => true,
    () => false,
  )
  if (insideRepo) {
    log.warn('Directory is already under version control. Skipping initialization of git.')
    return
  }
  const defaultBase = options.defaultBase || 'main'
  const [gitMajor, gitMinor] = gitVersion.split('.')

  if (+gitMajor > 2 || (+gitMajor === 2 && +gitMinor >= 28)) {
    await execute(['init', '-b', defaultBase])
  } else {
    await execute(['init'])
    await execute(['checkout', '-b', defaultBase]) // Git < 2.28 doesn't support -b on git init.
  }
  await execute(['add', '.'])
  if (options.commit) {
    const message = `${options.commit.message}` || 'initial commit'
    await execute(['commit', `-m "${message}"`])
  }
}
