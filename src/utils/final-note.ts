import { bold, white } from 'picocolors'
import { getPackageJson } from './get-package-json'
import { getStartScript } from './get-start-script'

export interface FinalNoteOptions {
  packageManager: string
  target: string
  targetDirectory: string
  instructions: string[]
}

export function finalNote({ packageManager, target, targetDirectory, instructions }: FinalNoteOptions): string {
  const packageJson = getPackageJson(targetDirectory)
  const startScript = getStartScript(packageJson.scripts)

  const lines: string[] = [
    `That's it!`,
    `Change to your new directory and start developing:`,
    msg(`cd ${target}`),
    ...(startScript ? [`Start the app:`, cmd(packageManager, startScript)] : []),
    ...instructions.map((line) => (line.startsWith('+') ? msg(line.slice(1)) : line)),
  ]

  return lines.filter(Boolean).join('\n\n')
}

function cmd(pm: string, command: string) {
  return msg(`${pm} run ${command}`)
}

function msg(message: string) {
  return bold(white(message))
}
