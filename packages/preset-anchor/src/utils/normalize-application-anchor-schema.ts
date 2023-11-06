import {
  ApplicationAnchorSchema,
  NormalizedApplicationAnchorSchema,
} from '../generators/application/application-anchor-schema'

export function normalizeApplicationAnchorSchema(options: ApplicationAnchorSchema): NormalizedApplicationAnchorSchema {
  return {
    ...options,
    skipFormat: options.skipFormat ?? false,
    template: options.template ?? 'counter',
  }
}
