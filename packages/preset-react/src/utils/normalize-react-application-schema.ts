import { ReactApplicationSchema } from '../generators/react-application/react-application-schema'

export type NormalizedReactApplicationSchema = Required<ReactApplicationSchema> & {
  directory: string
}

export type ReactApplicationUi = ReactApplicationSchema['ui']

export function normalizeReactApplicationSchema(options: ReactApplicationSchema): NormalizedReactApplicationSchema {
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
