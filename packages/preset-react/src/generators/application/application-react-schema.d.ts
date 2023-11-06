import { ApplicationAnchorTemplate } from '@solana-developers/preset-anchor'
export type ApplicationReactUiLibrary = 'none' | 'tailwind'

export interface ApplicationReactSchema {
  anchorName?: string
  anchorTemplate?: ApplicationAnchorTemplate
  name: string
  skipFormat?: boolean
  uiLibrary?: ApplicationReactUiLibrary
  withAnchor?: boolean
}

export type NormalizedApplicationReactSchema = Required<ApplicationReactSchema>
