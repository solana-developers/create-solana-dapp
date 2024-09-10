import packageJson from '../../package.json' assert { type: 'json' }

export interface AppInfo {
  name: string
  version: string
}

export function getAppInfo(): AppInfo {
  return {
    name: packageJson.name,
    version: packageJson.version,
  }
}
