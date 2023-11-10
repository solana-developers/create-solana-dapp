// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

export function getAppInfo(): {
  name: string
  version: string
} {
  return {
    name: packageJson.name,
    version: packageJson.version,
  }
}
