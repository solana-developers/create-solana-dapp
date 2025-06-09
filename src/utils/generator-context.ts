import { Template } from '../templates/templates'
import { PackageManager } from './vendor/package-manager'

export interface GeneratorContext {
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
