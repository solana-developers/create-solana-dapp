import { output } from '@nx/devkit'
import { execAndWait } from 'create-nx-workspace/src/utils/child-process-utils'
import { mapErrorToBodyLines } from 'create-nx-workspace/src/utils/error-utils'
import {
  generatePackageManagerFiles,
  getPackageManagerCommand,
  PackageManager,
} from 'create-nx-workspace/src/utils/package-manager'
import { writeFileSync } from 'fs'
import { nxVersion } from 'nx/src/utils/versions'
import { join } from 'path'
import { dirSync } from 'tmp'

/**
 * Creates a temporary directory and installs Nx in it.
 * @param packageManager package manager to use
 * @returns directory where Nx is installed
 */
export async function customCreateSandbox(packageManager: PackageManager) {
  const { install, preInstall } = getPackageManagerCommand(packageManager)

  const tmpDir = dirSync().name
  try {
    writeFileSync(
      join(tmpDir, 'package.json'),
      JSON.stringify({
        dependencies: {
          nx: nxVersion,
          '@nx/workspace': nxVersion,
        },
        license: 'MIT',
      }),
    )
    generatePackageManagerFiles(tmpDir, packageManager)

    if (preInstall) {
      await execAndWait(preInstall, tmpDir)
    }

    await execAndWait(install, tmpDir)
  } catch (e) {
    if (e instanceof Error) {
      output.error({
        title: `Failed to install dependencies`,
        bodyLines: mapErrorToBodyLines(e),
      })
    } else {
      console.error(e)
    }
    process.exit(1)
  }

  return tmpDir
}
