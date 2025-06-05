export function getStartScript(scripts: Record<string, string> | undefined): 'dev' | 'start' | undefined {
  if (scripts?.dev) {
    return 'dev'
  }
  if (scripts?.start) {
    return 'start'
  }

  return undefined
}
