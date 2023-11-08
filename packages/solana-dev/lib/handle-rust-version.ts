import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { parseVersion } from './parse-version'

export function handleRustVersion() {
  const s = p.spinner()
  s.start('Getting Rust version')
  try {
    const version = parseVersion('rustc --version', /rustc (.*) \(/)
    s.stop(`Rust version: ${version}`)
  } catch (error) {
    s.stop(`Rust version: ${color.red('Not installed')}`)
    p.log.error(`Rust is required to build Solana programs. ${color.underline(color.cyan('https://rustup.rs'))}`)
    return
  }
}
