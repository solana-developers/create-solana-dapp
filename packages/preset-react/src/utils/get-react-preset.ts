import { Tree } from '@nx/devkit'
import { join } from 'path'

export type ReactPreset = 'react' | 'next'
export function getReactPreset(tree: Tree, sourceRoot: string): ReactPreset {
  const isNext = tree.exists(join(sourceRoot, 'next.config.js'))

  return isNext ? 'next' : 'react'
}
