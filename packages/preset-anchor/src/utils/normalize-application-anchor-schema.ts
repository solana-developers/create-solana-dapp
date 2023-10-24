import {
  ApplicationAnchorSchema,
  NormalizedApplicationAnchorSchema,
} from '../generators/application/application-anchor-schema'

export function normalizeApplicationAnchorSchema(options: ApplicationAnchorSchema): NormalizedApplicationAnchorSchema {
  return {
    ...options,
    programName: options.programName ?? 'my-program',
    skipFormat: options.skipFormat ?? false,
  }
}
