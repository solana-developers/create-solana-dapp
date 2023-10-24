export type ApplicationReactUiLibrary = 'none' | 'tailwind'

export interface ApplicationReactSchema {
  name: string
  skipFormat?: boolean
  uiLibrary?: ApplicationReactUiLibrary
  withAnchor?: boolean
}

export type NormalizedApplicationReactSchema = Required<ApplicationReactSchema>
