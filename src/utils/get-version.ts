import { parseVersion } from './parse-version'

export const versionCommands: Record<string, { command: string; name: string; regex: RegExp }> = {
  adb: {
    command: 'adb --version',
    name: 'Adb   ',
    regex: /Version (\d+\.\d+\.\d+)/,
  },
  anchor: {
    command: 'anchor --version',
    name: 'Anchor',
    regex: /anchor-cli (\d+\.\d+\.\d+)/,
  },
  avm: {
    command: 'avm --version',
    name: 'AVM   ',
    regex: /avm (\d+\.\d+\.\d+)/,
  },
  rust: {
    command: 'rustc --version',
    name: 'Rust  ',
    regex: /rustc (\d+\.\d+\.\d+)/,
  },
  solana: {
    command: 'solana --version',
    name: 'Solana',
    regex: /solana-cli (\d+\.\d+\.\d+)/,
  },
}

export function getVersion(command: keyof typeof versionCommands): string | undefined {
  const cmd = versionCommands[command]
  if (!cmd) {
    throw new Error(`Unknown command ${command}`)
  }

  try {
    return parseVersion(cmd.command, cmd.regex)
  } catch {
    return undefined
  }
}
