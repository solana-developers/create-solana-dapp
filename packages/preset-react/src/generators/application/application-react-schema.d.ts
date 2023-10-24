export type ApplicationReactUiLibrary = 'none' | 'tailwind'

export interface ApplicationReactSchema {
  anchorName?: string
  anchorProgramName?: string
  name: string
  skipFormat?: boolean
  uiLibrary?: ApplicationReactUiLibrary
  withAnchor?: boolean
}

export type NormalizedApplicationReactSchema = Required<ApplicationReactSchema>
