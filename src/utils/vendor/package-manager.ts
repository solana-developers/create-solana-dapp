/**
 * This file includes portions of code from the 'create-nx-workspace' package.
 * The original code can be found at:
 * https://github.com/nrwl/nx/blob/2c0a50c0d8f45f65c9a91e1426fc2e66a29af3bb/packages/create-nx-workspace/src/utils/package-manager.ts
 *
 * This code is licensed under the MIT License:
 * MIT License
 * Copyright (c) 2017-2024 Narwhal Technologies Inc.
 *
 * The full MIT License is available in the LICENSE file at the root of this repository.
 */
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

export const packageManagers = ['pnpm', 'npm', 'yarn'] as const
export type PackageManager = (typeof packageManagers)[number]

export function detectInvokedPackageManager(): PackageManager {
  let detectedPackageManager: PackageManager = 'npm'
  const invoker = require.main

  if (!invoker) {
    return detectedPackageManager
  }

  for (const pkgManager of packageManagers) {
    if (invoker.path.includes(pkgManager)) {
      console.log(`Found ${pkgManager}`)
      detectedPackageManager = pkgManager
      break
    }
  }
  return detectedPackageManager
}

/**
 * Returns commands for the package manager used in the workspace.
 * By default, the package manager is derived based on the lock file,
 * but it can also be passed in explicitly.
 *
 * Example:
 *
 * ```javascript
 * execSync(`${getPackageManagerCommand().addDev} my-dev-package`);
 * ```
 *
 */
export function getPackageManagerCommand(packageManager: PackageManager = detectPackageManager()): {
  install: string
  exec: string
  preInstall?: string
  globalAdd: string
  lockFile: string
  // Make this required once bun adds programatically support for reading config https://github.com/oven-sh/bun/issues/7140
  getRegistryUrl?: string
} {
  const pmVersion = getPackageManagerVersion(packageManager)
  const [pmMajor, pmMinor] = pmVersion.split('.')

  switch (packageManager) {
    case 'yarn': {
      const useBerry = +pmMajor >= 2
      const installCommand = 'yarn install --silent'
      return {
        preInstall: `yarn set version ${pmVersion}`,
        install: useBerry ? installCommand : `${installCommand} --ignore-scripts`,
        // using npx is necessary to avoid yarn classic manipulating the version detection when using berry
        exec: useBerry ? 'npx' : 'yarn',
        globalAdd: 'yarn global add',
        getRegistryUrl: useBerry ? 'yarn config get npmRegistryServer' : 'yarn config get registry',
        lockFile: 'yarn.lock',
      }
    }

    case 'pnpm': {
      let useExec = false
      if ((+pmMajor >= 6 && +pmMinor >= 13) || +pmMajor >= 7) {
        useExec = true
      }
      return {
        install: 'pnpm install --no-frozen-lockfile --silent --ignore-scripts',
        exec: useExec ? 'pnpm exec' : 'pnpx',
        globalAdd: 'pnpm add -g',
        getRegistryUrl: 'pnpm config get registry',
        lockFile: 'pnpm-lock.yaml',
      }
    }

    case 'npm': {
      return {
        install: 'npm install --silent --ignore-scripts',
        exec: 'npx',
        globalAdd: 'npm i -g',
        getRegistryUrl: 'npm config get registry',
        lockFile: 'package-lock.json',
      }
    }
  }
}
const pmVersionCache = new Map<PackageManager, string>()

export function getPackageManagerVersion(packageManager: PackageManager, cwd = process.cwd()): string {
  if (pmVersionCache.has(packageManager)) {
    return pmVersionCache.get(packageManager) as string
  }
  const version = execSync(`${packageManager} --version`, {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
  }).trim()
  pmVersionCache.set(packageManager, version)
  return version
}

export function detectPackageManager(dir: string = ''): PackageManager {
  if (existsSync(join(dir, 'yarn.lock'))) {
    return 'yarn'
  }
  if (existsSync(join(dir, 'pnpm-lock.yaml'))) {
    return 'pnpm'
  }

  return 'npm'
}
