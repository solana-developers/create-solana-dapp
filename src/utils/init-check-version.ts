import { InitScript } from './get-init-script'
import { initCheckVersionAdb } from './init-check-version-adb'
import { initCheckVersionAnchor } from './init-check-version-anchor'
import { initCheckVersionSolana } from './init-check-version-solana'

export async function initCheckVersion(init: InitScript) {
  if (init?.versions?.adb) {
    await initCheckVersionAdb(init.versions.adb)
  }
  if (init?.versions?.anchor) {
    await initCheckVersionAnchor(init.versions.anchor)
  }
  if (init?.versions?.solana) {
    await initCheckVersionSolana(init.versions.solana)
  }
}
