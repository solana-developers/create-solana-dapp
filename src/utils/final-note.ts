import { bold, white } from 'picocolors'
import { GetArgsResult } from './get-args-result'
import { getPackageJson } from './get-package-json'
import { getStartScript } from './get-start-script'

export interface FinalNoteArgs extends GetArgsResult {
  target: string
  instructions: string[]
}

export function finalNote(args: FinalNoteArgs): string {
  const { contents } = getPackageJson(args.targetDirectory)
  const startScript = getStartScript(contents.scripts)

  const lines: string[] = [
    `That's it!`,
    `Change to your new directory and start developing:`,
    msg(`cd ${args.target}`),
    ...(args.skipInstall ? [`Install dependencies:`, cmd(args.packageManager, 'install')] : []),
    ...(startScript ? [`Start the app:`, cmd(args.packageManager, startScript)] : []),
    ...args.instructions.map((line) => (line.startsWith('+') ? msg(line.slice(1)) : line)),
  ]

  return lines.filter(Boolean).join('\n\n')
}

function cmd(pm: string, command: string) {
  return msg(`${pm} run ${command}`)
}

function msg(message: string) {
  return bold(white(message))
}
