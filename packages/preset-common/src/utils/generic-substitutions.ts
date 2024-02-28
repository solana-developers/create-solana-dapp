import { detectPackageManager, names, PackageManager } from '@nx/devkit'

export interface GenericSubstitutions {
  anchor: string
  anchorName: string
  anchorProgram: string
  licenseAuthor?: string
  name: string
  npmScope: string
  preset?: 'next' | 'react'
}
export function genericSubstitutions(
  {
    licenseAuthor = process.env['USER'] ?? '',
    anchor,
    anchorName,
    anchorProgram,
    name,
    npmScope,
    preset,
  }: GenericSubstitutions,
  pm: PackageManager = detectPackageManager(),
) {
  const runCmd = pm === 'npm' ? 'npm run' : pm.toString()
  anchorProgram = anchorProgram ?? anchorName
  return {
    ...names(name),
    licenseAuthor,
    anchor: names(anchor),
    anchorName: names(anchorName),
    anchorProgram: names(anchorProgram),
    npmScope,
    currentFullYear: new Date().getFullYear(),
    preset: preset ?? 'react',
    runCmd,
    pm,
  }
}
