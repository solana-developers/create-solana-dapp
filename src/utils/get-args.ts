import { intro, log, outro } from '@clack/prompts'
import { program } from 'commander'
import { findTemplate, listTemplates, Template } from '../templates/templates'
import { AppInfo } from './get-app-info'
import { GetArgsResult } from './get-args-result'
import { getPrompts } from './get-prompts'
import { listVersions } from './validate-version'
import { PackageManager } from './vendor/package-manager'

export async function getArgs(argv: string[], app: AppInfo, pm: PackageManager = 'npm'): Promise<GetArgsResult> {
  // Get the result from the command line
  const input = program
    .name(app.name)
    .version(app.version, '-V, --version', help('Output the version number'))
    .argument('[name]', 'Name of the project (default: <prompt>)')
    .option('--pm, --package-manager <package-manager>', help(`Package manager to use (default: npm)`))
    .option('--yarn', help(`Use yarn as the package manager`), false)
    .option('--pnpm', help(`Use pnpm as the package manager`), false)
    .option('-d, --dry-run', help('Dry run (default: false)'))
    .option('-t, --template <template-name>', help('Use a template'))
    .option('--list-templates', help('List available templates'))
    .option('--list-versions', help('Verify your versions of Anchor, AVM, Rust, and Solana'))
    .option('--skip-git', help('Skip git initialization'))
    .option('--skip-init', help('Skip running the init script'))
    .option('--skip-install', help('Skip installing dependencies'))
    .helpOption('-h, --help', help('Display help for command'))
    .addHelpText(
      'after',
      `
Examples:
  $ ${app.name} my-app
  $ ${app.name} my-app --package-manager pnpm # or --pm pnpm/yarn
  $ ${app.name} my-app --pnpm # or --yarn
      `,
    )
    .parse(argv)

  // Get the optional name argument (positional)
  const name = input.args[0]

  // Get the options from the command line
  const result = input.opts()

  if (result.listVersions) {
    listVersions()
    process.exit(0)
  }
  if (result.listTemplates) {
    listTemplates()
    outro(
      `\uD83D\uDCA1 To use a template, run "${app.name}${name ? ` ${name}` : ''} --template <template-name>" or "--template <github-org>/<github-repo>" `,
    )
    process.exit(0)
  }
  let packageManager = result.packageManager ?? pm

  // The 'yarn' and 'pnpm' options are mutually exclusive, and will override the 'packageManager' option
  if (result.pnpm && result.yarn) {
    log.error(`Both pnpm and yarn were specified. Please specify only one.`)
    throw new Error(`Both pnpm and yarn were specified. Please specify only one.`)
  }
  if (result.pnpm) {
    packageManager = 'pnpm'
  }
  if (result.yarn) {
    packageManager = 'yarn'
  }

  // Display the intro
  intro(`${app.name} ${app.version}`)

  let template: Template | undefined

  if (result.template) {
    template = findTemplate(result.template)
  }

  // Take the result from the command line and use it to populate the options
  const cwd = process.cwd()
  const options: Omit<GetArgsResult, 'template'> & { template?: Template } = {
    dryRun: result.dryRun ?? false,
    app,
    name: name ?? '',
    packageManager,
    skipGit: result.skipGit ?? false,
    skipInit: result.skipInit ?? false,
    skipInstall: result.skipInstall ?? false,
    targetDirectory: `${cwd}/${name}`,
    template,
  }

  // Get the prompts for any missing options
  const prompts = await getPrompts({ options: options as GetArgsResult })

  // Populate the options with the prompts
  if (prompts.name) {
    options.name = prompts.name
    options.targetDirectory = `${cwd}/${options.name}`
  }
  if (prompts.template) {
    options.template = prompts.template
  }

  if (!options.template) {
    throw new Error('No template specified')
  }

  return options as GetArgsResult
}

// Helper function to add a newline before the text
function help(text: string) {
  return `

  ${text}`
}
