import { log } from '@clack/prompts'
import { bold, yellow } from 'picocolors'
import { getVersion } from './get-version'
import { validateVersion } from './validate-version'

export async function initScriptVersionAdb(required?: string, verbose = false) {
  if (!required) {
    return
  }
  try {
    const { valid, version } = validateVersion({ required, version: getVersion('adb') })
    if (verbose) {
      log.warn(`initScriptVersionAdb: required: ${required}, version: ${version ?? '*none*'}, valid: ${valid}`)
    }
    if (!version) {
      log.warn(
        [
          bold(yellow(`Could not find adb version. Please install adb.`)),
          'https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local',
        ].join(' '),
      )
    } else if (!valid) {
      log.warn(
        [
          yellow(`Found adb version ${version}. Expected adb version ${required}.`),
          'https://docs.expo.dev/get-started/set-up-your-environment/?platform=android&device=physical&mode=development-build&buildEnv=local',
        ].join(' '),
      )
    }
  } catch (error_) {
    log.warn(`Error ${error_}`)
  }
}
