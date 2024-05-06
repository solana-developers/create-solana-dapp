import { parseVersion } from './parse-version'

const requiredVersion = '0.30.0'

function getAnchorVersion(): string | undefined {
  try {
    return parseVersion('anchor --version', /anchor-cli (.*)/)
  } catch (error) {
    return undefined
  }
}

export function validateAnchorVersion(): {
  requiredVersion: string
  valid: boolean
  version: string | undefined
} {
  const version = getAnchorVersion()

  return {
    requiredVersion,
    valid: version === requiredVersion,
    version,
  }
}
