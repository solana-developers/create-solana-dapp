import * as semver from 'semver'
import { getVersionAnchor, getVersionAvm, getVersionRust, getVersionSolana } from './get-version'

export type ValidateVersionResult = {
  required: string
  valid: boolean
  version: string | undefined
}

export function validateVersion({
  required,
  version,
}: {
  required: string
  version?: string | undefined
}): ValidateVersionResult {
  const valid = semver.satisfies(version ?? '', `>=${required}`)

  return {
    required,
    valid,
    version,
  }
}

export function validateAnchorVersion(required: string): ValidateVersionResult {
  return validateVersion({ required, version: getVersionAnchor() })
}

export function validateSolanaVersion(required: string): ValidateVersionResult {
  return validateVersion({ required, version: getVersionSolana() })
}

export function listVersions() {
  const anchor = getVersionAnchor()
  const avm = getVersionAvm()
  const rust = getVersionRust()
  const solana = getVersionSolana()

  console.log(`Locally installed versions:`)
  console.log(`  Anchor: ${anchor}`)
  console.log(`  AVM   : ${avm}`)
  console.log(`  Rust  : ${rust}`)
  console.log(`  Solana: ${solana}`)
}
