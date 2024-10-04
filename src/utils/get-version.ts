import { parseVersion } from './parse-version'

export function getVersion(command: string, regex: RegExp): string | undefined {
  try {
    return parseVersion(command, regex)
  } catch {
    return undefined
  }
}

export function getVersionAnchor(): string | undefined {
  return getVersion('anchor --version', /anchor-cli (\d+\.\d+\.\d+)/)
}

export function getVersionSolana(): string | undefined {
  return getVersion('solana --version', /solana-cli (\d+\.\d+\.\d+)/)
}

export function getVersionRust(): string | undefined {
  return getVersion('rustc --version', /rustc (\d+\.\d+\.\d+)/)
}
export function getVersionAvm(): string | undefined {
  return getVersion('avm --version', /avm (\d+\.\d+\.\d+)/)
}
