import {
  ApplicationReactSchema,
  NormalizedApplicationReactSchema,
} from '../generators/application/application-react-schema'

export function normalizeApplicationReactSchema(options: ApplicationReactSchema): NormalizedApplicationReactSchema {
  return {
    ...options,
    skipFormat: options.skipFormat ?? false,
    uiLibrary: options.uiLibrary ?? 'tailwind',
    withAnchor: options.withAnchor ?? true,
  }
}
