import { detectPackageManager, names, PackageManager } from '@nx/devkit'

export interface GenericSubstitutions {
  anchor: string
  anchorName: string
  anchorProgramName: string
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
    anchorProgramName,
    name,
    npmScope,
    preset,
  }: GenericSubstitutions,
  pm: PackageManager = detectPackageManager(),
) {
  const runCmd = pm === 'npm' ? 'npm run' : pm.toString()
  anchorProgramName = anchorProgramName ?? anchorName
  return {
    ...names(name),
    licenseAuthor,
    anchor: names(anchor),
    anchorName: names(anchorName),
    anchorProgramName: names(anchorProgramName),
    npmScope,
    currentFullYear: new Date().getFullYear(),
    preset: preset ?? 'react',
    runCmd,
    pm,
  }
}
