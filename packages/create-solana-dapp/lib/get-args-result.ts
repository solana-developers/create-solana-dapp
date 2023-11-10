import { CreateWorkspaceOptions } from 'create-nx-workspace'

export interface GetArgsResult {
  anchor: string | undefined
  anchorName: string | undefined
  appName: string
  dryRun: boolean
  name: string | undefined
  package: string
  packageManager: CreateWorkspaceOptions['packageManager']
  preset: string | undefined
  ui: string | undefined
}
