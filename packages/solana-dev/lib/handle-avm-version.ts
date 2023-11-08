import * as p from '@clack/prompts'
import * as color from 'picocolors'
import { parseVersion } from './parse-version'

export function handleAvmVersion() {
  const s = p.spinner()
  s.start('Getting Avm version')
  try {
    const version = parseVersion('avm --version', /avm (.*)/)
    s.stop(`Avm version: ${version}`)
  } catch (error) {
    s.stop(`Avm version: ${color.red('Not installed')}`)
    p.log.error(
      `Avm is required to build Solana programs. ${color.underline(
        color.cyan('https://www.anchor-lang.com/docs/installation#anchor'),
      )}`,
    )
    return
  }
}
