import { log } from '@clack/prompts'
import { bold, yellow } from 'picocolors'
import { getVersion } from './get-version'
import { validateVersion } from './validate-version'

export async function initCheckVersionSolana(required: string) {
  try {
    const { valid, version } = validateVersion({ required, version: getVersion('solana') })
    if (!version) {
      log.warn(
        [
          bold(yellow(`Could not find Solana version. Please install Solana.`)),
          'https://docs.solana.com/cli/install-solana-cli-tools',
        ].join(' '),
      )
    } else if (!valid) {
      log.warn(
        [
          yellow(`Found Solana version ${version}. Expected Solana version ${required}.`),
          'https://docs.solana.com/cli/install-solana-cli-tools',
        ].join(' '),
      )
    }
  } catch (error_) {
    log.warn(`Error ${error_}`)
  }
}
