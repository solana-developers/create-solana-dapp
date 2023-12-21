import { ReactApplicationSchema } from '../generators/react-application/react-application-schema'

export type NormalizedReactApplicationSchema = Required<ReactApplicationSchema>

export type ReactApplicationUi = ReactApplicationSchema['ui']
export function normalizeReactApplicationSchema(options: ReactApplicationSchema): NormalizedReactApplicationSchema {
  return {
    ...options,
    anchor: options.anchor,
    anchorName: options.anchorName ?? 'anchor',
    port: options.port ?? 3000,
    skipFormat: options.skipFormat ?? false,
    ui: options.ui ?? 'tailwind',
    webName: options.webName ?? options.name,
  }
}
