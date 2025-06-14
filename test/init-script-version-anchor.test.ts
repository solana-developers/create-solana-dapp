import { log } from '@clack/prompts'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getVersion } from '../src/utils/get-version'
import { initScriptVersionAnchor } from '../src/utils/init-script-version-anchor'
import { validateVersion } from '../src/utils/validate-version'

vi.mock('../src/utils/get-version')
vi.mock('../src/utils/validate-version')
vi.mock('@clack/prompts', () => ({
  log: {
    warn: vi.fn(),
  },
}))

describe('initScriptVersionAnchor', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return early if no required version is provided', async () => {
    await initScriptVersionAnchor()
    expect(getVersion).not.toHaveBeenCalled()
    expect(validateVersion).not.toHaveBeenCalled()
    expect(log.warn).not.toHaveBeenCalled()
  })

  it('should log warning if anchor version is not found', async () => {
    const required = '1.0.0'
    vi.mocked(getVersion).mockReturnValue(undefined)
    vi.mocked(validateVersion).mockReturnValue({ valid: false, version: undefined })
    await initScriptVersionAnchor(required)
    expect(getVersion).toHaveBeenCalledWith('anchor')
    expect(validateVersion).toHaveBeenCalledWith({ required, version: undefined })
    expect(log.warn).toHaveBeenCalledWith(
      expect.stringContaining('Could not find Anchor version. Please install Anchor.'),
    )
  })

  it('should log warning if anchor version does not satisfy the requirement', async () => {
    const required = '1.0.0'
    const version = '0.9.0'
    vi.mocked(getVersion).mockReturnValue(version)
    vi.mocked(validateVersion).mockReturnValue({ valid: false, version })
    await initScriptVersionAnchor(required)
    expect(getVersion).toHaveBeenCalledWith('anchor')
    expect(validateVersion).toHaveBeenCalledWith({ required, version })
    expect(log.warn).toHaveBeenCalledWith(
      expect.stringContaining(`Found Anchor version ${version}. Expected Anchor version ${required}.`),
    )
  })

  it('should not log warning if anchor version satisfies the requirement', async () => {
    const required = '1.0.0'
    const version = '1.0.0'
    vi.mocked(getVersion).mockReturnValue(version)
    vi.mocked(validateVersion).mockReturnValue({ valid: true, version })
    await initScriptVersionAnchor(required)
    expect(getVersion).toHaveBeenCalledWith('anchor')
    expect(validateVersion).toHaveBeenCalledWith({ required, version })
    expect(log.warn).not.toHaveBeenCalled()
  })

  it('should log verbose message if verbose is true', async () => {
    const required = '1.0.0'
    const version = '1.0.0'
    vi.mocked(getVersion).mockReturnValue(version)
    vi.mocked(validateVersion).mockReturnValue({ valid: true, version })
    await initScriptVersionAnchor(required, true)
    expect(getVersion).toHaveBeenCalledWith('anchor')
    expect(validateVersion).toHaveBeenCalledWith({ required, version })
    expect(log.warn).toHaveBeenCalledWith(
      `initScriptVersionAnchor: required: ${required}, version: ${version}, valid: true`,
    )
  })

  it('should log error if an exception occurs', async () => {
    const required = '1.0.0'
    const error = new Error('Test error')
    vi.mocked(getVersion).mockImplementation(() => {
      throw error
    })
    await initScriptVersionAnchor(required)
    expect(log.warn).toHaveBeenCalledWith(`Error ${error}`)
  })
})
