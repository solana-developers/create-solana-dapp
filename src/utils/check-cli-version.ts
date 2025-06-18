import { log } from '@clack/prompts'
import { bold, red, yellow } from 'picocolors'
import * as semver from 'semver'
import { AppInfo } from './get-app-info'
import { fetchLatestNpmVersion } from './fetch-npm-version'

export interface VersionCheckOptions {
  blockOnOutdated?: boolean
  verbose?: boolean
}

export interface VersionCheckResult {
  isOutdated: boolean
  currentVersion: string
  latestVersion?: string
  shouldBlock: boolean
}

/**
 * Checks if the current CLI version is outdated compared to NPM latest
 * @param app - App info containing name and current version
 * @param options - Configuration options for version checking
 * @returns Promise<VersionCheckResult>
 */
export async function checkCliVersion(app: AppInfo, options: VersionCheckOptions = {}): Promise<VersionCheckResult> {
  const { blockOnOutdated = false, verbose = false } = options

  if (verbose) {
    log.info(`Checking CLI version for ${app.name}@${app.version}`)
  }

  try {
    const latestVersion = await fetchLatestNpmVersion(app.name)

    if (!latestVersion) {
      if (verbose) {
        log.warn('Could not fetch latest version from NPM')
      }
      return {
        isOutdated: false,
        currentVersion: app.version,
        shouldBlock: false,
      }
    }

    const isOutdated = semver.lt(app.version, latestVersion)

    if (verbose) {
      log.info(`Current: ${app.version}, Latest: ${latestVersion}, Outdated: ${isOutdated}`)
    }

    const result = {
      isOutdated,
      currentVersion: app.version,
      latestVersion,
      shouldBlock: blockOnOutdated && isOutdated,
    }

    if (isOutdated) {
      await showVersionWarning(app, latestVersion, blockOnOutdated)
    }

    return result
  } catch (error) {
    if (verbose) {
      log.warn(`Error checking version: ${error}`)
    }
    return {
      isOutdated: false,
      currentVersion: app.version,
      shouldBlock: false,
    }
  }
}

/**
 * Shows version warning message to the user
 */
async function showVersionWarning(app: AppInfo, latestVersion: string, blockOnOutdated: boolean) {
  const packageName = app.name
  const currentVersion = app.version

  const warningMessage = [
    '',
    blockOnOutdated ? red(bold('⚠️  OUTDATED VERSION DETECTED')) : yellow(bold('⚠️  Update Available')),
    '',
    `Current version: ${red(currentVersion)}`,
    `Latest version:  ${bold(latestVersion)}`,
    '',
    'To ensure you get the latest templates and features, please run with @latest:',
    '',
    bold(`  npm create ${packageName}@latest`),
    bold(`  pnpm create ${packageName}@latest`),
    bold(`  yarn create ${packageName}@latest`),
    bold(`  bun create ${packageName}@latest`),
    '',
    blockOnOutdated
      ? red('This version is no longer supported. Please update to continue.')
      : 'Using an outdated version may result in issues with templates or functionality.',
    '',
  ].join('\n')

  log.warn(warningMessage)

  if (blockOnOutdated) {
    process.exit(1)
  }
}
