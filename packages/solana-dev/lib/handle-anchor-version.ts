import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { parseVersion } from './parse-version'

export function handleAnchorVersion() {
  const s = p.spinner()
  s.start('Getting Anchor version')
  try {
    const version = parseVersion('anchor --version', /anchor-cli (.*)/)
    s.stop(`Anchor version: ${version}`)
  } catch (error) {
    s.stop(`Anchor version: ${color.red('Not installed')}`)
    p.log.error(
      `Anchor is required to build Solana programs. ${color.underline(
        color.cyan('https://www.anchor-lang.com/docs/installation'),
      )}`,
    )
    return
  }
}
