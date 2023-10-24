import { ApplicationReactUiLibrary } from '@solana-developers/preset-react'

export interface ApplicationNextSchema {
  anchorName?: string
  anchorProgramName?: string
  name: string
  skipFormat?: boolean
  uiLibrary?: ApplicationReactUiLibrary
  withAnchor?: boolean
}

export type NormalizedApplicationNextSchema = Required<ApplicationNextSchema>
