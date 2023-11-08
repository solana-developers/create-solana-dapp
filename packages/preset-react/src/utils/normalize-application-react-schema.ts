import { ApplicationReactSchema } from '../generators/application/application-react-schema'

export type NormalizedApplicationReactSchema = Required<ApplicationReactSchema>

export type ApplicationReactUiLibrary = ApplicationReactSchema['uiLibrary']

export function normalizeApplicationReactSchema(options: ApplicationReactSchema): NormalizedApplicationReactSchema {
  return {
    ...options,
    anchorName: options.anchorName ?? 'program',
    anchorTemplate: options.anchorTemplate ?? 'counter',
    appName: options.appName ?? options.name,
    skipFormat: options.skipFormat ?? false,
    uiLibrary: options.uiLibrary ?? 'tailwind',
    withAnchor: options.withAnchor ?? true,
  }
}
