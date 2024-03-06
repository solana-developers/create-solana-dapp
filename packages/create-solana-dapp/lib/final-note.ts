import { bold, magentaBright } from 'chalk'
import { GetArgsResult } from './get-args-result'

export function finalNote(args: GetArgsResult & { target: string }): string {
  const lines: string[] = [
    `That's it!`,
    `Change to your new directory and start developing:`,
    msg(`cd ${args.target}`),
    `Start the ${presetLabel(args.preset)} app:`,
    cmd(args.packageManager, 'dev'),
  ]
  if (args.anchor !== 'none') {
    lines.push(...[`Run Anchor commands:`, cmd(args.packageManager, 'anchor build | test | localnet | deploy')])
    lines.push(...[`Generate more features using the following command:`, cmd(args.packageManager, 'feature')])
  }
  return lines.join('\n\n')
}

function presetLabel(preset: string) {
  switch (preset) {
    case 'next':
      return 'Next.js'
    case 'react':
      return 'React'
    default:
      return preset
  }
}

function cmd(pm: string, command: string) {
  return msg(`${pm} run ${command}`)
}

function msg(message: string) {
  return bold(magentaBright(message))
}
