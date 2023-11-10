import { log } from '@clack/prompts'
import { program } from 'commander'

import { CreateWorkspaceOptions } from 'create-nx-workspace'
import { anchorTemplates } from './anchor-templates'
import { getAppInfo } from './get-app-info'
import { GetArgsResult } from './get-args-result'
import { getPresets } from './get-presets'
import { getPrompts, getUiLibraries } from './get-prompts'

export async function getArgs(argv: string[]): Promise<GetArgsResult> {
  // Get app info from package.json
  const app = getAppInfo()

  // Get info about the presets
  const { presets, presetValues } = getPresets(app.version)

  // Get the result from the command line
  const input = program
    .name(app.name)
    .version(app.version)
    .argument('[name]', 'Name of the project (default: prompt)')
    .option(
      '-p, --preset <preset>',
      help(`Preset to use (default: prompt, options: ${presetValues.join(', ')})`),
      (value: string) => {
        if (!presetValues.includes(value)) {
          throw new Error(`Invalid preset: ${value}`)
        }
        return value
      },
    )
    .option('--ui <ui-library>', help(`UI library to use (default: prompt)`))
    .option(
      '-a, --anchor <template>',
      help(`Name of the Anchor template to use (default: prompt, set to false to disable)`),
      (value: string) => {
        if (!['false', ...anchorTemplates].includes(value)) {
          throw new Error(`Invalid anchor template: ${value}`)
        }
        return value
      },
    )
    .option('--app-name <name>', help(`Name of the frontend project (default: web)`))
    .option('--anchor-name <anchor-name>', help(`Anchor project name (default: anchor)`))
    .option('-pm, --package-manager <package-manager>', help(`Package manager to use (default: npm)`))
    .option('-d, --dry-run', 'Dry run (default: false)')
    .addHelpText(
      'after',
      `
Examples:
  $ ${app.name} my-app --preset react
  $ ${app.name} my-app --preset react --package-manager yarn
  $ ${app.name} my-app --preset react --anchor-template hello-world
      `,
    )
    .parse(argv)

  // Get the optional name argument (positional)
  const name = input.args[0]

  // Get the options from the command line
  const result = input.opts()

  // Take the result from the command line and use it to populate the options
  const options: GetArgsResult = {
    anchor: result.anchor,
    anchorName: result.anchorName ?? 'anchor',
    appName: result.appName ?? 'web',
    dryRun: result.dryRun ?? false,
    name: name ?? '',
    package: '',
    packageManager: (result.packageManager ?? 'npm') as CreateWorkspaceOptions['packageManager'],
    preset: result.preset,
    ui: result.ui,
  }

  // Get the prompts for any missing options
  const prompts = await getPrompts({ options, presets })

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

  // Validate the options
  if (options.preset && !presetValues.includes(options.preset)) {
    log.error(`Invalid preset: ${options.preset}`)
    throw new Error(`Invalid preset: ${options.preset}`)
  }

  if (!['false', ...anchorTemplates].includes(options.anchor ?? '')) {
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

  ${text}
`
}
