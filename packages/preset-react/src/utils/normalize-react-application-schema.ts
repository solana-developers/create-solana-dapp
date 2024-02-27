import { Tree } from '@nx/devkit'
import { ReactApplicationSchema } from '../generators/react-application/react-application-schema'
import { join } from 'path'

export type NormalizedReactApplicationSchema = Required<ReactApplicationSchema> & {
  directory: string
}

export type ReactApplicationUi = ReactApplicationSchema['ui']
export type ReactPreset = 'react' | 'next'
export function normalizeReactApplicationSchema(options: ReactApplicationSchema): NormalizedReactApplicationSchema {
  const webName = options.webName ?? options.name
  return {
    ...options,
    anchor: options.anchor,
    anchorName: options.anchorName ?? 'anchor',
    anchorProgramName: options.anchorProgramName ?? options.anchor,
    directory: webName,
    port: options.port ?? 3000,
    skipFormat: options.skipFormat ?? false,
    ui: options.ui ?? 'tailwind',
    webName,
  }
}

export function getReactPreset(tree: Tree, sourceRoot: string): ReactPreset {
  const isNext = tree.exists(join(sourceRoot, 'next.config.js'))

  return isNext ? 'next' : 'react'
}
