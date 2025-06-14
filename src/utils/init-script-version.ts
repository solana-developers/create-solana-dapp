import { log } from '@clack/prompts'
import { initScriptVersionAdb } from './init-script-version-adb'
import { initScriptVersionAnchor } from './init-script-version-anchor'
import { initScriptVersionSolana } from './init-script-version-solana'
import { InitScriptVersions } from './init-script-versions-schema'

export async function initScriptVersion(versions?: InitScriptVersions, verbose = false) {
  if (!versions) {
    if (verbose) {
      log.warn(`initScriptCheckVersion: no versions found`)
    }
    return
  }
  await initScriptVersionAdb(versions.adb, verbose)
  await initScriptVersionAnchor(versions.anchor, verbose)
  await initScriptVersionSolana(versions.solana, verbose)
}
