import { ApplicationReactSchema } from '../generators/application/application-react-schema'

export type NormalizedApplicationReactSchema = Required<ApplicationReactSchema>

export type ApplicationReactUi = ApplicationReactSchema['ui']

export function normalizeApplicationReactSchema(options: ApplicationReactSchema): NormalizedApplicationReactSchema {
  return {
    ...options,
    anchor: options.anchor,
    anchorName: options.anchorName ?? 'anchor',
    appName: options.appName ?? options.name,
    skipFormat: options.skipFormat ?? false,
    ui: options.ui ?? 'tailwind',
  }
}
