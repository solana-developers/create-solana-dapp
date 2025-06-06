import { log } from '@clack/prompts'
import { bold, yellow } from 'picocolors'
import { getVersion } from './get-version'
import { validateVersion } from './validate-version'

export async function initCheckVersionAnchor(required: string) {
  try {
    const { valid, version } = validateVersion({ required, version: getVersion('anchor') })
    if (!version) {
      log.warn(
        [
          bold(yellow(`Could not find Anchor version. Please install Anchor.`)),
          'https://www.anchor-lang.com/docs/installation',
        ].join(' '),
      )
    } else if (!valid) {
      log.warn(
        [
          yellow(`Found Anchor version ${version}. Expected Anchor version ${required}.`),
          'https://www.anchor-lang.com/release-notes/0.30.1',
        ].join(' '),
      )
    }
  } catch (error_) {
    log.warn(`Error ${error_}`)
  }
}
