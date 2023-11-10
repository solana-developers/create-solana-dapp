import { names } from '@nx/devkit'

export function genericSubstitutions({ name, npmScope }: { name: string; npmScope: string }) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return {
    ...names(name),
    npmScope,
    currentFullYear: new Date().getFullYear(),
  }
}
