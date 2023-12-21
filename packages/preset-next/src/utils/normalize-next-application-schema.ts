import { NextApplicationSchema } from '../generators/next-application/next-application-schema'

export type NormalizedNextApplicationSchema = Required<NextApplicationSchema>

export type NextApplicationUi = NextApplicationSchema['ui']
export function normalizeNextApplicationSchema(options: NextApplicationSchema): NormalizedNextApplicationSchema {
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
