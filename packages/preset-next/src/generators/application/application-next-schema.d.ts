import { ApplicationAnchorTemplate } from '@solana-developers/preset-anchor'
import { ApplicationReactUiLibrary } from '@solana-developers/preset-react'

export interface ApplicationNextSchema {
  appName?: string
  name: string
  port?: number
  skipFormat?: boolean
  uiLibrary?: ApplicationReactUiLibrary
  withAnchor?: boolean
  anchorName?: string
  anchorTemplate?: ApplicationAnchorTemplate
}

export type NormalizedApplicationNextSchema = Required<ApplicationNextSchema>
