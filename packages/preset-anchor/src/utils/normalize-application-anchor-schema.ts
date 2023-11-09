import { ApplicationAnchorSchema } from '../'

export function normalizeApplicationAnchorSchema(options: ApplicationAnchorSchema): NormalizedApplicationAnchorSchema {
  return {
    ...options,
    skipFormat: options.skipFormat ?? false,
    template: options.template ?? 'counter',
  }
}

export type NormalizedApplicationAnchorSchema = Required<ApplicationAnchorSchema>
export type ApplicationAnchorTemplate = ApplicationAnchorSchema['template']
