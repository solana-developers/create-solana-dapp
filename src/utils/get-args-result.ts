import { AppInfo } from './get-app-info'
import { PackageManager } from './vendor/package-manager'
import { Template } from './template'

export interface GetArgsResult {
  app: AppInfo
  dryRun: boolean
  name: string
  targetDirectory: string
  packageManager: PackageManager
  skipGit: boolean
  skipInit: boolean
  skipInstall: boolean
  template: Template
  verbose: boolean
}
