import { intro, log } from '@clack/prompts'
import { program } from 'commander'
import { PackageManager } from 'nx/src/utils/package-manager'
import { getAnchorTemplates } from './get-anchor-templates'
import { getAppInfo } from './get-app-info'
import { GetArgsResult } from './get-args-result'
import { getPresets } from './get-presets'
import { getPrompts, getUiLibraries } from './get-prompts'

export async function getArgs(argv: string[], pm: PackageManager = 'npm'): Promise<GetArgsResult> {
  // Get app info from package.json
  const app = getAppInfo()

  // Get info about the presets
  const { presets, presetValues } = getPresets(app.version)
  const { anchorTemplates, anchorTemplateValues } = getAnchorTemplates()
  // Get the result from the command line
  const input = program
    .name(app.name)
    .version(app.version, '-V, --version', help('Output the version number\n'))
    .argument('[name]', 'Name of the project (default: <prompt>)')
    .option(
      '-p, --preset <preset>',
      help(`Preset to use (default: <prompt>, options: ${presetValues.join(', ')})\n`),
      (value: string) => {
        if (!presetValues.includes(value)) {
          throw new Error(`Invalid preset: ${value}`)
        }
        return value
      },
    )
    .option('--ui <ui-library>', help(`UI library to use (default: <prompt>)\n`))
    .option(
      '-a, --anchor <template>',
      help(`Name of the Anchor template to use (default: <prompt>, set to "none" to prevent adding Anchor)\n`),
      (value: string) => {
        if (!anchorTemplateValues.includes(value)) {
          throw new Error(`Invalid anchor template: ${value}`)
        }
        return value
      },
    )
    .option('--anchor-build', help(`Build the anchor project`), false)
    .option('--anchor-name <name>', help(`Anchor project name (default: anchor)\n`))
    .option('--anchor-program <name>', help(`Anchor program name\n`))
    .option('--web-name <name>', help(`Web project name (default: web)\n`))
    .option('--web-port <port>', help(`Web project port (default: 3000)\n`))
    .option('-pm, --package-manager <package-manager>', help(`Package manager to use (default: npm)\n`))
    .option('--yarn', help(`Use yarn as the package manager`), false)
    .option('--pnpm', help(`Use pnpm as the package manager`), false)
    .option('-d, --dry-run', help('Dry run (default: false)\n'))
    .helpOption('-h, --help', help('Display help for command\n'))
    .addHelpText(
      'after',
      `
Examples:
  $ ${app.name} my-app --preset react
  $ ${app.name} my-app --preset react --package-manager yarn
  $ ${app.name} my-app --preset react --anchor basic
      `,
    )
    .parse(argv)

  // Get the optional name argument (positional)
  const name = input.args[0]

  // Get the options from the command line
  const result = input.opts()

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

  // Take the result from the command line and use it to populate the options
  const options: GetArgsResult = {
    anchor: result.anchor,
    anchorBuild: result.anchorBuild,
    anchorName: result.anchorName ?? 'anchor',
    anchorProgram: result.anchorProgram ?? name ?? '',
    dryRun: result.dryRun ?? false,
    name: name ?? '',
    package: '',
    packageManager,
    pnpm: result.pnpm ? result.pnpm : false,
    preset: result.preset,
    ui: result.ui,
    yarn: result.yarn ? result.yarn : false,
    webName: result.webName ?? 'web',
    webPort: result.webPort ?? 3000,
  }

  // Display the intro
  intro(`${app.name} ${app.version}`)

  // Get the prompts for any missing options
  const prompts = await getPrompts({ anchorTemplates, options, presets })

  // Populate the options with the prompts
  if (prompts.name) {
    options.name = prompts.name
  }
  if (prompts.preset) {
    options.preset = prompts.preset
  }
  if (prompts.ui) {
    options.ui = prompts.ui as string
  }
  if (prompts.anchor) {
    options.anchor = prompts.anchor
  }
  if (options.anchor !== 'none') {
    options.anchorProgram = prompts.anchorProgram as string
  }

  // Validate the options
  if (options.preset && !presetValues.includes(options.preset)) {
    log.error(`Invalid preset: ${options.preset}`)
    throw new Error(`Invalid preset: ${options.preset}`)
  }

  if (!anchorTemplateValues.includes(options.anchor ?? '')) {
    log.error(`Invalid anchor template: ${options.anchor}`)
    throw new Error(`Invalid anchor template: ${options.anchor}`)
  }

  const libs = getUiLibraries(options.preset as 'next' | 'react')
  if (options.ui && !libs.map((l) => l.value).includes(options.ui)) {
    log.error(`Invalid ui library for preset ${options.preset}: ${options.ui}`)
    throw new Error(`Invalid ui library for preset ${options.preset}: ${options.ui}`)
  }

  // Create the package string
  // TODO: In the future, we should allow the user to specify the package and version using the preset option
  if (options.package === '') {
    const packageName = presets.find((preset) => preset.value === options.preset)?.package
    const packageVersion = presets.find((preset) => preset.value === options.preset)?.version
    options.package = `${packageName}@${packageVersion}`
  }

  return options
}

// Helper function to add a newline before the text
function help(text: string) {
  return `

  ${text}`
}
