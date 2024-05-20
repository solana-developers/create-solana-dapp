import { execAndWait } from 'create-nx-workspace/src/utils/child-process-utils'
import { detectInvokedPackageManager, getPackageManagerCommand } from 'create-nx-workspace/src/utils/package-manager'

export declare const packageManagers: readonly ['pnpm', 'yarn', 'npm']
export type PackageManager = (typeof packageManagers)[number]

export function detectPackageManager(): PackageManager {
  return detectInvokedPackageManager()
}

export async function installPackages(directory: string, packageManager: PackageManager) {
  const { install, preInstall } = getPackageManagerCommand(packageManager)
  if (preInstall) {
    await execAndWait(preInstall, directory)
  }
  await execAndWait(install, directory)
}
