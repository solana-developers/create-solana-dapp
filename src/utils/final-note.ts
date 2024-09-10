import { bold, white } from 'picocolors'
import { GetArgsResult } from './get-args-result'

export function finalNote(args: GetArgsResult & { target: string; instructions: string[] }): string {
  const lines: string[] = [
    `That's it!`,
    `Change to your new directory and start developing:`,
    msg(`cd ${args.target}`),
    `Start the app:`,
    cmd(args.packageManager, 'dev'),
    ...args.instructions.map((line) => (line.startsWith('+') ? msg(line.slice(1)) : line)),
  ]

  return lines.join('\n\n')
}

function cmd(pm: string, command: string) {
  return msg(`${pm} run ${command}`)
}

function msg(message: string) {
  return bold(white(message))
}
