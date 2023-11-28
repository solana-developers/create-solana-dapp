import { detectPackageManager, names } from '@nx/devkit'

export interface GenericSubstitutions {
  anchor: string
  anchorName: string
  licenseAuthor?: string
  name: string
  npmScope: string
  preset?: 'next' | 'react'
}
export function genericSubstitutions({
  licenseAuthor = process.env['USER'] ?? '',
  anchor,
  anchorName,
  name,
  npmScope,
  preset,
}: GenericSubstitutions) {
  const pm = detectPackageManager()
  const runCmd = pm === 'npm' ? 'npm run' : pm.toString()

  return {
    ...names(name),
    licenseAuthor,
    anchor: names(anchor),
    anchorName: names(anchorName),
    npmScope,
    currentFullYear: new Date().getFullYear(),
    preset: preset ?? 'react',
    runCmd,
  }
}
