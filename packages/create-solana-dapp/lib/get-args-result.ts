import { CreateWorkspaceOptions } from 'create-nx-workspace'

export interface GetArgsResult {
  anchor: string | undefined
  anchorBuild: boolean
  anchorName: string | undefined
  anchorProgram: string | undefined
  dryRun: boolean
  name: string | undefined
  package: string
  packageManager: CreateWorkspaceOptions['packageManager']
  pnpm: boolean
  preset: string | undefined
  ui: string | undefined
  yarn: boolean
  webName: string
  webPort: number
}
