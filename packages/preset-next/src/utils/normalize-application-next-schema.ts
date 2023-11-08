import { ApplicationNextSchema } from '../generators/application/application-next-schema'

export type NormalizedApplicationNextSchema = Required<ApplicationNextSchema>
export function normalizeApplicationNextSchema(options: ApplicationNextSchema): NormalizedApplicationNextSchema {
  return {
    ...options,
    appName: options.appName ?? options.name,
    port: options.port ?? 3000,
    skipFormat: options.skipFormat ?? false,
    uiLibrary: options.uiLibrary ?? 'tailwind',
    withAnchor: options.withAnchor ?? true,
    anchorName: options.anchorName ?? 'program',
    anchorTemplate: options.anchorTemplate ?? 'counter',
  }
}
