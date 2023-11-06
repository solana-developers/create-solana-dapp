import {
  ApplicationNextSchema,
  NormalizedApplicationNextSchema,
} from '../generators/application/application-next-schema'

export function normalizeApplicationNextSchema(options: ApplicationNextSchema): NormalizedApplicationNextSchema {
  return {
    ...options,
    anchorName: options.anchorName ?? 'program',
    anchorTemplate: options.anchorTemplate ?? 'counter',
    skipFormat: options.skipFormat ?? false,
    uiLibrary: options.uiLibrary ?? 'tailwind',
    withAnchor: options.withAnchor ?? true,
  }
}
