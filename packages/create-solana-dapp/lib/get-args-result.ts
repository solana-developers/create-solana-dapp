import { PackageManager } from './nx-helpers'

export interface GetArgsResult {
  anchor: string | undefined
  anchorBuild: boolean
  anchorName: string | undefined
  anchorProgram: string | undefined
  dryRun: boolean
  isTemplate: boolean
  name: string | undefined
  package: string
  packageManager: PackageManager
  pnpm: boolean
  preset: string | undefined
  ui: string | undefined
  webName: string
  webPort: number
  yarn: boolean
}
