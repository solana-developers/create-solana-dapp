import { beforeEach, describe, expect, it, vi } from 'vitest'
import { execSync } from 'node:child_process'
import { fetchLatestNpmVersion, getNpmVersionInfo } from '../src/utils/fetch-npm-version'

// Mock execSync and fetch
vi.mock('node:child_process')
globalThis.fetch = vi.fn()

describe('fetchLatestNpmVersion', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return version from npm command', async () => {
    vi.mocked(execSync).mockReturnValue('4.3.3\n' as any)

    const result = await fetchLatestNpmVersion('create-solana-dapp')

    expect(result).toBe('4.3.3')
    expect(execSync).toHaveBeenCalledWith('npm view create-solana-dapp version', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 5000,
    })
  })

  it('should fallback to HTTP request when npm command fails', async () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('npm command failed')
    })

    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({ version: '4.3.3' }),
    }
    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await fetchLatestNpmVersion('create-solana-dapp')

    expect(result).toBe('4.3.3')
    expect(fetch).toHaveBeenCalledWith('https://registry.npmjs.org/create-solana-dapp/latest')
  })

  it('should return undefined when both npm command and HTTP request fail', async () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('npm command failed')
    })
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

    const result = await fetchLatestNpmVersion('create-solana-dapp')

    expect(result).toBeUndefined()
  })

  it('should return undefined when HTTP response is not ok', async () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('npm command failed')
    })

    const mockResponse = {
      ok: false,
    }
    vi.mocked(fetch).mockResolvedValue(mockResponse as any)

    const result = await fetchLatestNpmVersion('create-solana-dapp')

    expect(result).toBeUndefined()
  })

  it('should handle empty npm command output', async () => {
    vi.mocked(execSync).mockReturnValue('' as any)

    const result = await fetchLatestNpmVersion('create-solana-dapp')

    expect(result).toBeUndefined()
  })
})

describe('getNpmVersionInfo', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return version info when latest version is available', async () => {
    vi.mocked(execSync).mockReturnValue('4.4.0\n' as any)

    const result = await getNpmVersionInfo('create-solana-dapp', '4.3.3')

    expect(result).toEqual({
      latest: '4.4.0',
      current: '4.3.3',
    })
  })

  it('should return undefined when latest version cannot be fetched', async () => {
    vi.mocked(execSync).mockImplementation(() => {
      throw new Error('npm command failed')
    })
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

    const result = await getNpmVersionInfo('create-solana-dapp', '4.3.3')

    expect(result).toBeUndefined()
  })
})
