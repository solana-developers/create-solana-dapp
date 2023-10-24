import { names } from '@nx/devkit'

export function applicationSubstitutions({ name, npmScope }: { name: string; npmScope: string }) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require('../../package.json')
  return {
    ...names(name),
    packageName: packageJson.name,
    packageVersion: packageJson.version,
    npmScope,
  }
}
