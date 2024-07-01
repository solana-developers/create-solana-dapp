import { bold, greenBright, magentaBright, yellowBright } from 'chalk'
import { GetArgsResult } from './get-args-result'
import { validateAnchorVersion } from './validate-anchor-version'

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
    const { requiredVersion, valid, version } = validateAnchorVersion()
    if (!version) {
      lines.push(
        ...[
          bold(yellowBright(`Could not find Anchor version. Please install Anchor.`)),
          'https://www.anchor-lang.com/docs/installation',
        ],
      )
    } else if (!valid) {
      lines.push(
        ...[
          yellowBright(`Found Anchor version ${version}. Expected Anchor version ${requiredVersion}.`),
          'https://www.anchor-lang.com/release-notes/0.30.0',
        ],
      )
    } else {
      lines.push(greenBright(`Found Anchor version ${version}. Great!`))
    }
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
