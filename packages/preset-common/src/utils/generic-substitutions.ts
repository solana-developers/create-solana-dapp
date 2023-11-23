import { names } from '@nx/devkit'

export interface GenericSubstitutions {
  name: string
  npmScope: string
  anchor: string
  anchorName: string
  preset?: 'next' | 'react'
}
export function genericSubstitutions({ anchor, anchorName, name, npmScope, preset }: GenericSubstitutions) {
  return {
    ...names(name),
    anchor: names(anchor),
    anchorName: names(anchorName),
    npmScope,
    currentFullYear: new Date().getFullYear(),
    preset: preset ?? 'react',
  }
}
