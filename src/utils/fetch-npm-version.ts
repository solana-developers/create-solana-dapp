import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

export interface NpmVersionInfo {
  latest: string
  current: string
}

/**
 * Fetches the latest version of a package from NPM registry
 * @param packageName - The name of the npm package
 * @returns Promise<string | undefined> - The latest version string or undefined if failed
 */
export async function fetchLatestNpmVersion(packageName: string): Promise<string | undefined> {
  try {
    // Use npm view command to get the latest version
    const { stdout } = await execAsync(`npm view ${packageName} version`, {
      encoding: 'utf8',
      timeout: 5000, // 5 second timeout
    })

    return stdout.trim() || undefined
  } catch {
    // Fallback to HTTP request if npm command fails
    try {
      const response = await fetch(`https://registry.npmjs.org/${packageName}/latest`)
      if (!response.ok) {
        return undefined
      }
      const data = await response.json()
      return data.version
    } catch {
      return undefined
    }
  }
}

/**
 * Gets version information comparing current vs latest from NPM
 * @param packageName - The name of the npm package
 * @param currentVersion - The current version
 * @returns Promise<NpmVersionInfo | undefined>
 */
export async function getNpmVersionInfo(
  packageName: string,
  currentVersion: string,
): Promise<NpmVersionInfo | undefined> {
  const latest = await fetchLatestNpmVersion(packageName)

  if (!latest) {
    return undefined
  }

  return {
    latest,
    current: currentVersion,
  }
}
