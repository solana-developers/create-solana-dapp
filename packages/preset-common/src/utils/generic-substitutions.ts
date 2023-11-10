import { names } from '@nx/devkit'

export function genericSubstitutions({ name, npmScope }: { name: string; npmScope: string }) {
  return {
    ...names(name),
    npmScope,
    currentFullYear: new Date().getFullYear(),
  }
}
