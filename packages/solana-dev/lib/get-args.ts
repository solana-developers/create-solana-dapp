import * as p from '@clack/prompts'
import { Command } from 'commander'
import * as color from 'picocolors'
import { handleAnchorVersion } from './handle-anchor-version'
import { handleAvmVersion } from './handle-avm-version'
import { handleNodeVersion } from './handle-node-version'
import { handleRustVersion } from './handle-rust-version'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export const app = {
  name: packageJson.name,
  version: packageJson.version,
  supportUrl: 'https://solana.stackexchange.com/questions/tagged/solana-dev',
}

export async function getArgs(): Promise<void> {
  const program = new Command().name(app.name).version(app.version)

  program.addCommand(makeDoctorCommand())

  program.parse(process.argv)

  return
}

export function makeDoctorCommand() {
  return new Command('doctor').action(async () => {
    p.intro(`${color.bgCyan(color.black(` ${app.name} ${app.version} doctor `))}`)

    handleNodeVersion()
    handleRustVersion()
    handleAvmVersion()
    handleAnchorVersion()

    p.outro(`Problems? ${color.underline(color.cyan(app.supportUrl))}`)
  })
}
