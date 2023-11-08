import * as p from '@clack/prompts'
import * as color from 'picocolors'
import * as semver from 'semver'

export function handleNodeVersion() {
  const mindVersion = '18.3'
  const s = p.spinner()
  s.start('Getting Node version')
  const version = process.version
  if (!semver.satisfies(version, `>=${mindVersion}`)) {
    s.stop(`Node version: ${color.red(version)}`)
    p.log.error(
      `Node version must be >= ${mindVersion}. ${color.underline(color.cyan('https://nodejs.org/en/download/'))}`,
    )
    return
  }
  s.stop(`Node version: ${version}`)
}
