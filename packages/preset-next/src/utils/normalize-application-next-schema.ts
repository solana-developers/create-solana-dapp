import {
  ApplicationNextSchema,
  NormalizedApplicationNextSchema,
} from '../generators/application/application-next-schema'

export function normalizeApplicationNextSchema(options: ApplicationNextSchema): NormalizedApplicationNextSchema {
  return {
    ...options,
    anchorName: options.anchorName ?? 'anchor',
    anchorProgramName: options.anchorProgramName ?? 'my-program',
    skipFormat: options.skipFormat ?? false,
    uiLibrary: options.uiLibrary ?? 'tailwind',
    withAnchor: options.withAnchor ?? true,
  }
}
