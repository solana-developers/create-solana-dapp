export interface ApplicationAnchorSchema {
  name: string
  programName?: string
  skipFormat?: boolean
}

export type NormalizedApplicationAnchorSchema = Required<ApplicationAnchorSchema>
