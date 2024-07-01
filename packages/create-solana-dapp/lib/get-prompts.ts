import { cancel, group, log, select, text } from '@clack/prompts'
import { AnchorTemplate } from './get-anchor-templates'
import { GetArgsResult } from './get-args-result'
import { isPresetTemplate, Preset, PresetType } from './get-presets'
import { validateProjectName } from './validate-project-name'

export function getPrompts({
  anchorTemplates,
  options,
  presets,
}: {
  anchorTemplates: AnchorTemplate[]
  options: GetArgsResult
  presets: Preset[]
}) {
  return group(
    {
      name: () => {
        if (options.name) {
          log.success(`Project name: ${options.name}`)
          return Promise.resolve(options.name)
        }
        return text({
          message: 'Enter project name',
          validate: validateProjectName,
        })
      },
      preset: () => {
        if (options.preset) {
          log.success(`Preset: ${presets.find((p) => p.value === options.preset)?.label}`)
          return Promise.resolve(options.preset)
        }
        return select({
          message: 'Select a preset',
          options: presets.map(({ label, value }) => ({ label, value })) as [],
        })
      },
      ui: ({ results }) => {
        const preset = results?.preset ?? options.preset
        if (isPresetTemplate(preset)) {
          return Promise.resolve(undefined)
        }
        const libs = getUiLibraries(preset as PresetType)

        if (options.ui) {
          log.success(`UI library: ${libs.find((l) => l.value === options.ui)?.label}`)
          return Promise.resolve(options.ui)
        }
        return select({
          message: 'Select a UI library',
          options: getUiLibraries(preset as PresetType),
          initialValue: libs.find((lib) => lib.value !== 'none')?.value,
        })
      },
      anchor: ({ results }) => {
        const preset = results?.preset ?? options.preset
        if (isPresetTemplate(preset)) {
          return Promise.resolve('none')
        }
        if (options.anchor) {
          const anchor = anchorTemplates.find((a) => a.value === options.anchor)
          log.success(`Anchor template: ${anchor.label}`)
          return Promise.resolve(options.anchor)
        }
        return select({
          message: 'Select an Anchor template',
          options: anchorTemplates.map(({ label, value }) => ({ label, value })) as [],
        })
      },
      anchorProgram: ({ results }) => {
        if (options.anchor) {
          const anchorProgram = options.anchorProgram.length ? options.anchorProgram : results.name ?? 'my-program'
          log.success(`Anchor program name: ${anchorProgram}`)
          return Promise.resolve(anchorProgram)
        }
      },
    },
    {
      onCancel: () => {
        cancel('Operation cancelled.')
        process.exit(0)
      },
    },
  )
}

export function getUiLibraries(preset: PresetType): {
  label: string
  value: string
}[] {
  switch (preset) {
    case PresetType.next:
      return [
        { label: 'None', value: 'none' },
        { label: 'Tailwind', value: 'tailwind' },
      ]
    case PresetType.react:
      return [
        { label: 'None', value: 'none' },
        { label: 'Tailwind', value: 'tailwind' },
      ]
    default:
      return []
  }
}
