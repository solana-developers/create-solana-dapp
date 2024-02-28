import { NextApplicationSchema } from '../generators/next-application/next-application-schema'

export type NormalizedNextApplicationSchema = Required<NextApplicationSchema> & {
  directory: string
}

export type NextApplicationUi = NextApplicationSchema['ui']
export function normalizeNextApplicationSchema(options: NextApplicationSchema): NormalizedNextApplicationSchema {
  const webName = options.webName ?? options.name
  return {
    ...options,
    anchor: options.anchor,
    anchorName: options.anchorName ?? 'anchor',
    anchorProgram: options.anchorProgram ?? options.anchor,
    directory: webName,
    port: options.port ?? 3000,
    skipFormat: options.skipFormat ?? false,
    ui: options.ui ?? 'tailwind',
    webName,
  }
}
