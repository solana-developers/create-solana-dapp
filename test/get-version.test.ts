import * as childProcess from 'node:child_process'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getVersion, versionCommands } from '../src/utils/get-version'

vi.mock('node:child_process', () => ({
  execSync: vi.fn(),
}))

describe('versionCommands', () => {
  it('should have the expected commands', () => {
    expect(Object.keys(versionCommands)).toEqual(['adb', 'anchor', 'avm', 'rust', 'solana'])
  })

  it('should have correct structure for each command', () => {
    for (const cmd of Object.values(versionCommands)) {
      expect(cmd).toHaveProperty('command', expect.any(String))
      expect(cmd).toHaveProperty('name', expect.any(String))
      expect(cmd).toHaveProperty('regex', expect.any(RegExp))
    }
  })
})

describe('getVersion', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should return version for known command', () => {
    ;(childProcess.execSync as any).mockReturnValue('anchor-cli 0.24.2\n')
    const version = getVersion('anchor')
    expect(version).toBe('0.24.2')
    expect(childProcess.execSync).toHaveBeenCalledWith('anchor --version', { stdio: ['ignore', 'pipe', 'ignore'] })
  })

  it('should throw error for unknown command', () => {
    expect(() => getVersion('unknown' as any)).toThrow('Unknown command unknown')
  })

  it('should return undefined if parsing fails', () => {
    ;(childProcess.execSync as any).mockReturnValue('Invalid output\n')
    const version = getVersion('anchor')
    expect(version).toBeUndefined()
  })
})
