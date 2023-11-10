import { genericSubstitutions } from '@solana-developers/preset-common'

export function applicationSubstitutions({ name, npmScope }: { name: string; npmScope: string }) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require('../../package.json')
  return {
    ...genericSubstitutions({ name, npmScope }),
    packageName: packageJson.name,
    packageVersion: packageJson.version,
  }
}
