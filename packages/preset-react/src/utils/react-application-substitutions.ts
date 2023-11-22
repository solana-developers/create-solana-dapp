import { GenericSubstitutions, genericSubstitutions } from '@solana-developers/preset-common'

export function reactApplicationSubstitutions(options: GenericSubstitutions) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require('../../package.json')
  return {
    ...genericSubstitutions(options),
    packageName: packageJson.name,
    packageVersion: packageJson.version,
  }
}
