/**
 * This script starts a local registry for e2e testing purposes.
 * It is meant to be called in jest's globalSetup.
 */
import { startLocalRegistry } from '@nx/js/plugins/jest/local-registry'
import { execFileSync } from 'child_process'

export default async () => {
  // local registry target to run
  const localRegistryTarget = '@solana-developers/source:local-registry'
  // storage folder for the local registry
  const storage = './tmp/local-registry/storage'

  global.stopLocalRegistry = await startLocalRegistry({
    localRegistryTarget,
    storage,
    verbose: false,
  })
  const nx = require.resolve('nx')
  const NPM_VERSION = process.env.NPM_VERSION ?? '999.999.999-e2e.999'
  execFileSync(nx, ['run-many', '--targets', 'publish', '--ver', NPM_VERSION, '--tag', 'e2e'], {
    env: process.env,
    stdio: 'inherit',
  })
}
