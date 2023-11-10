import { names } from '@nx/devkit'

export interface GenericSubstitutions {
  name: string
  npmScope: string
  anchorName: string
}
export function genericSubstitutions({ anchorName, name, npmScope }: GenericSubstitutions) {
  return {
    ...names(name),
    anchor: names(anchorName),
    npmScope,
    currentFullYear: new Date().getFullYear(),
  }
}
