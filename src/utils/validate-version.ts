import * as semver from 'semver'

export function validateVersion({ required, version }: { required: string; version?: string | undefined }): {
  valid: boolean
  version: string | undefined
} {
  const valid = semver.satisfies(version ?? '', `>=${required}`)

  return { valid, version }
}
