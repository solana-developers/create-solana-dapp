import { ApplicationAnchorTemplate } from '@solana-developers/preset-anchor'
import { ApplicationReactUiLibrary } from '@solana-developers/preset-react'

export interface ApplicationNextSchema {
  anchorName?: string
  anchorTemplate?: ApplicationAnchorTemplate
  name: string
  skipFormat?: boolean
  uiLibrary?: ApplicationReactUiLibrary
  withAnchor?: boolean
}

export type NormalizedApplicationNextSchema = Required<ApplicationNextSchema>
