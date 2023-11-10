import { CreateWorkspaceOptions } from 'create-nx-workspace'
import { createPreset } from 'create-nx-workspace/src/create-preset'
import { mapErrorToBodyLines } from 'create-nx-workspace/src/utils/error-utils'
import { initializeGitRepo } from 'create-nx-workspace/src/utils/git/git'
import { getThirdPartyPreset } from 'create-nx-workspace/src/utils/preset/get-third-party-preset'
import { customCreateEmptyWorkspace } from './custom-create-empty-workspace'
import { customCreateSandbox } from './custom-create-sandbox'

export async function customCreateWorkspace<T extends CreateWorkspaceOptions>(
  preset: string,
  options: T,
  afterCreatePreset: (options: T) => Promise<void>,
) {
  const { packageManager, name, skipGit = false, defaultBase = 'main', commit } = options

  const tmpDir = await customCreateSandbox(packageManager)

  // nx new requires preset currently. We should probably make it optional.
  const directory = await customCreateEmptyWorkspace<T>(tmpDir, name, packageManager, { ...options, preset })

  // If the preset is a third-party preset, we need to call createPreset to install it
  // For first-party presets, it will created by createEmptyWorkspace instead.
  // In createEmptyWorkspace, it will call `nx new` -> `@nx/workspace newGenerator` -> `@nx/workspace generatePreset`.

  const thirdPartyPreset = await getThirdPartyPreset(preset)
  if (thirdPartyPreset) {
    // Hide the stdout of createPreset
    await createPreset(thirdPartyPreset, options, packageManager, directory)
  }
  await afterCreatePreset(options)

  if (!skipGit && commit) {
    try {
      await initializeGitRepo(directory, { defaultBase, commit })
    } catch (e) {
      if (e instanceof Error) {
        console.error({
          title: 'Could not initialize git repository',
          bodyLines: mapErrorToBodyLines(e),
        })
      } else {
        console.error(e)
      }
    }
  }

  return {
    directory,
  }
}
