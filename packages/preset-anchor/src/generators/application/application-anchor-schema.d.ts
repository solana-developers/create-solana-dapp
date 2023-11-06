export type ApplicationAnchorTemplate = 'counter' | 'hello-world'
export interface ApplicationAnchorSchema {
  name: string
  skipFormat?: boolean
  template?: ApplicationAnchorTemplate
}

export type NormalizedApplicationAnchorSchema = Required<ApplicationAnchorSchema>
