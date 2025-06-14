import { log } from '@clack/prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getVersion } from '../src/utils/get-version'
import { initScriptVersionAdb } from '../src/utils/init-script-version-adb'
import { validateVersion } from '../src/utils/validate-version'

vi.mock('../src/utils/get-version')
vi.mock('../src/utils/validate-version')
vi.mock('@clack/prompts', () => ({
  log: {
    warn: vi.fn(),
  },
}))

describe('initScriptVersionAdb', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return early if no required version is provided', async () => {
    await initScriptVersionAdb()
    expect(getVersion).not.toHaveBeenCalled()
    expect(validateVersion).not.toHaveBeenCalled()
    expect(log.warn).not.toHaveBeenCalled()
  })

  it('should log warning if adb version is not found', async () => {
    const required = '1.0.0'
    vi.mocked(getVersion).mockReturnValue(undefined)
    vi.mocked(validateVersion).mockReturnValue({ valid: false, version: undefined })
    await initScriptVersionAdb(required)
    expect(getVersion).toHaveBeenCalledWith('adb')
    expect(validateVersion).toHaveBeenCalledWith({ required, version: undefined })
    expect(log.warn).toHaveBeenCalledWith(expect.stringContaining('Could not find adb version. Please install adb.'))
  })

  it('should log warning if adb version does not satisfy the requirement', async () => {
    const required = '1.0.0'
    const version = '0.9.0'
    vi.mocked(getVersion).mockReturnValue(version)
    vi.mocked(validateVersion).mockReturnValue({ valid: false, version })
    await initScriptVersionAdb(required)
    expect(getVersion).toHaveBeenCalledWith('adb')
    expect(validateVersion).toHaveBeenCalledWith({ required, version })
    expect(log.warn).toHaveBeenCalledWith(
      expect.stringContaining(`Found adb version ${version}. Expected adb version ${required}.`),
    )
  })

  it('should not log warning if adb version satisfies the requirement', async () => {
    const required = '1.0.0'
    const version = '1.0.0'
    vi.mocked(getVersion).mockReturnValue(version)
    vi.mocked(validateVersion).mockReturnValue({ valid: true, version })
    await initScriptVersionAdb(required)
    expect(getVersion).toHaveBeenCalledWith('adb')
    expect(validateVersion).toHaveBeenCalledWith({ required, version })
    expect(log.warn).not.toHaveBeenCalled()
  })

  it('should log verbose message if verbose is true', async () => {
    const required = '1.0.0'
    const version = '1.0.0'
    vi.mocked(getVersion).mockReturnValue(version)
    vi.mocked(validateVersion).mockReturnValue({ valid: true, version })
    await initScriptVersionAdb(required, true)
    expect(getVersion).toHaveBeenCalledWith('adb')
    expect(validateVersion).toHaveBeenCalledWith({ required, version })
    expect(log.warn).toHaveBeenCalledWith(
      `initScriptVersionAdb: required: ${required}, version: ${version}, valid: true`,
    )
  })

  it('should log error if an exception occurs', async () => {
    const required = '1.0.0'
    const error = new Error('Test error')
    vi.mocked(getVersion).mockImplementation(() => {
      throw error
    })
    await initScriptVersionAdb(required)
    expect(log.warn).toHaveBeenCalledWith(`Error ${error}`)
  })
})
