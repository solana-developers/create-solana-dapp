import { Template } from '../templates/templates'
import { AppInfo } from './get-app-info'
import { PackageManager } from './vendor/package-manager'

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
}
