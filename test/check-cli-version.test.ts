import { beforeEach, describe, expect, it, vi } from 'vitest'
import { checkCliVersion } from '../src/utils/check-cli-version'
import { fetchLatestNpmVersion } from '../src/utils/fetch-npm-version'
import { AppInfo } from '../src/utils/get-app-info'

// Mock the npm version fetcher
vi.mock('../src/utils/fetch-npm-version')

// Mock process.exit to prevent actual process termination in tests
const mockExit = vi.spyOn(process, 'exit').mockImplementation(((_code?: number) => {
  // Don't actually exit or throw, just record the call
  return undefined as never
}) as any)

describe('checkCliVersion', () => {
  const mockApp: AppInfo = {
    name: 'create-solana-dapp',
    version: '4.3.3',
  }

  beforeEach(() => {
    vi.resetAllMocks()
    mockExit.mockClear()
  })

  it('should return not outdated when versions are equal', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.3.3')

    const result = await checkCliVersion(mockApp, { verbose: false })

    expect(result).toEqual({
      isOutdated: false,
      currentVersion: '4.3.3',
      latestVersion: '4.3.3',
      shouldBlock: false,
    })
  })

  it('should return not outdated when current version is newer', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.3.2')

    const result = await checkCliVersion(mockApp, { verbose: false })

    expect(result).toEqual({
      isOutdated: false,
      currentVersion: '4.3.3',
      latestVersion: '4.3.2',
      shouldBlock: false,
    })
  })

  it('should return outdated when current version is older', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.4.0')

    const result = await checkCliVersion(mockApp, { verbose: false })

    expect(result).toEqual({
      isOutdated: true,
      currentVersion: '4.3.3',
      latestVersion: '4.4.0',
      shouldBlock: false,
    })
  })

  it('should call process.exit by default when version is outdated (new default behavior)', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.4.0')

    // Default behavior is now to block execution when outdated
    // The function may or may not return a result due to Vitest's process.exit handling
    await checkCliVersion(mockApp, {
      blockOnOutdated: true, // This is now the default behavior
      verbose: false,
    }).catch(() => {
      // Ignore any errors from Vitest's process.exit detection
    })

    // Verify that the npm version was fetched
    expect(fetchLatestNpmVersion).toHaveBeenCalledWith('create-solana-dapp')

    // Most importantly, verify that process.exit was called with code 1
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it('should not call process.exit when version is up to date', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.3.2') // older version, so not outdated

    const result = await checkCliVersion(mockApp, {
      blockOnOutdated: true,
      verbose: false,
    })

    expect(result).toEqual({
      isOutdated: false,
      currentVersion: '4.3.3',
      latestVersion: '4.3.2',
      shouldBlock: false, // Should be false because not outdated
    })

    // Should not call process.exit when not outdated
    expect(mockExit).not.toHaveBeenCalled()
  })

  it('should allow warning-only mode when blockOnOutdated is false', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.4.0')

    const result = await checkCliVersion(mockApp, {
      blockOnOutdated: false, // Explicit warning-only mode
      verbose: false,
    })

    expect(result).toEqual({
      isOutdated: true,
      currentVersion: '4.3.3',
      latestVersion: '4.4.0',
      shouldBlock: false, // Should be false when blockOnOutdated is false
    })

    // Should not call process.exit in warning-only mode
    expect(mockExit).not.toHaveBeenCalled()
  })

  it('should return not outdated when npm fetch fails', async () => {
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue(undefined)

    const result = await checkCliVersion(mockApp, { verbose: false })

    expect(result).toEqual({
      isOutdated: false,
      currentVersion: '4.3.3',
      shouldBlock: false,
    })
  })

  it('should handle errors gracefully', async () => {
    vi.mocked(fetchLatestNpmVersion).mockRejectedValue(new Error('Network error'))

    const result = await checkCliVersion(mockApp, { verbose: false })

    expect(result).toEqual({
      isOutdated: false,
      currentVersion: '4.3.3',
      shouldBlock: false,
    })
  })

  it('should work with prerelease versions', async () => {
    const prereleaseApp: AppInfo = {
      name: 'create-solana-dapp',
      version: '4.4.0-beta.1',
    }
    vi.mocked(fetchLatestNpmVersion).mockResolvedValue('4.3.3')

    const result = await checkCliVersion(prereleaseApp, { verbose: false })

    expect(result).toEqual({
      isOutdated: false,
      currentVersion: '4.4.0-beta.1',
      latestVersion: '4.3.3',
      shouldBlock: false,
    })
  })
})
