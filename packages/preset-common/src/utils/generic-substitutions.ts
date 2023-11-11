import { names } from '@nx/devkit'

export interface GenericSubstitutions {
  name: string
  npmScope: string
  anchor: string
  anchorName: string
}
export function genericSubstitutions({ anchor, anchorName, name, npmScope }: GenericSubstitutions) {
  return {
    ...names(name),
    anchor: names(anchor),
    anchorName: names(anchorName),
    npmScope,
    currentFullYear: new Date().getFullYear(),
  }
}
