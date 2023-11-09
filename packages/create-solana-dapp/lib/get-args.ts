import { program } from 'commander'
import { select, text } from '@clack/prompts'

import { CreateWorkspaceOptions } from 'create-nx-workspace'
import { getPresets } from './get-presets'

import { validateProjectName } from './validate-project-name'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')

const anchorTemplateChoices = ['counter', 'hello-world']

export const app = {
  name: packageJson.name,
  version: packageJson.version,
}

function comment(text: string) {
  return `

 ${text}
`
}

export async function getArgs(argv: string[]): Promise<ArgsOptions> {
  const { presets, presetChoices } = getPresets(packageJson.version)

  const res = program
    .name(packageJson.name)
    .version(packageJson.version)
    .argument('[name]', 'Name of the project')
    .option('--app-name <name>', comment(`Name of the frontend project (default: web)`))
    .option('-p, --preset <preset>', comment(`Preset to use (options: ${presetChoices.join(', ')})`))
    .option('-d, --dry-run', comment(`Dry run (default: false)`))
    .option('-a, --anchor', comment(`Include anchor in the project`), (validate) => Boolean(validate), true)
    .option('--anchor-name <anchor-name>', comment(`Anchor project name (default: anchor)`))
    .option('--anchor-template <anchor-template>', comment(`Anchor template (default: counter)`))
    .option('-pm, --package-manager <package-manager>', comment(`Package manager to use (default: npm)`))
    .addHelpText(
      'after',
      `
Examples:
  $ ${packageJson.name} my-app --preset react
  $ ${packageJson.name} my-app --preset react --package-manager yarn
  $ ${packageJson.name} my-app --preset react --anchor-template hello-world
      `,
    )
    .parse(argv)

  const name = res.args[0]
  const result = res.opts()

  const options: ArgsOptions = {
    anchor: result.anchor,
    anchorName: result.anchorName ?? 'anchor',
    anchorTemplate: result.anchorTemplate ?? 'counter',
    appName: result.appName ?? 'web',
    dryRun: result.dryRun ?? false,
    name: name ?? '',
    package: '',
    packageManager: (result.packageManager ?? 'npm') as CreateWorkspaceOptions['packageManager'],
    preset: result.preset,
  }

  if (!options.name?.length) {
    options.name = await text({
      message: 'Enter project name',
      validate: validateProjectName,
    }).then((res) => res.toString())
  }

  if (!options.preset?.length) {
    options.preset = await select({
      message: 'Select a preset',
      options: presets,
    }).then((res) => res.toString())
  }

  if (options.package === '') {
    const packageName = presets.find((preset) => preset.value === options.preset)?.package
    const packageVersion = presets.find((preset) => preset.value === options.preset)?.version
    options.package = `${packageName}@${packageVersion}`
  }

  if (!options.anchor) {
    options.anchorName = undefined
    options.anchorTemplate = undefined
  }

  return options
}

export interface ArgsOptions {
  anchor: boolean
  anchorName: string | undefined
  anchorTemplate: string | undefined
  appName: string
  dryRun: boolean
  name: string | undefined
  package: string
  packageManager: CreateWorkspaceOptions['packageManager']
  preset: string | undefined
}
