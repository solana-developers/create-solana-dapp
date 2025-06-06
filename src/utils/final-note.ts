import { bold, white } from 'picocolors'
import { GetArgsResult } from './get-args-result'
import { getPackageJson } from './get-package-json'
import { getStartScript } from './get-start-script'

export function finalNote(args: GetArgsResult & { target: string; instructions: string[] }): string {
  const packageJson = getPackageJson(args.targetDirectory)
  const startScript = getStartScript(packageJson.scripts)

  const lines: string[] = [
    `That's it!`,
    `Change to your new directory and start developing:`,
    msg(`cd ${args.target}`),
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
