import { cancel, group, note, select, text } from '@clack/prompts'
import { anchorTemplates } from './anchor-templates'
import { GetArgsResult } from './get-args-result'
import { Preset } from './get-presets'
import { validateProjectName } from './validate-project-name'

export function getPrompts({ options, presets }: { options: GetArgsResult; presets: Preset[] }) {
  return group(
    {
      name: () => {
        if (options.name) {
          note(options.name, 'Project name')
          return Promise.resolve(options.name)
        }
        return text({
          message: 'Enter project name',
          validate: validateProjectName,
        })
      },
      preset: () => {
        if (options.preset) {
          note(presets.find((p) => p.value === options.preset)?.label, 'Preset')
          return Promise.resolve(options.preset)
        }
        return select({
          message: 'Select a preset',
          options: presets.map(({ label, value }) => ({ label, value })) as [],
        })
      },
      ui: ({ results }) => {
        const preset = results?.preset ?? options.preset
        const libs = getUiLibraries(preset as 'next' | 'react')

        if (options.ui) {
          note(libs.find((l) => l.value === options.ui)?.label, 'UI library')
          return Promise.resolve(options.ui)
        }
        return select({
          message: 'Select a UI library',
          options: getUiLibraries(preset as 'next' | 'react'),
          initialValue: libs.find((lib) => lib.value !== 'none')?.value,
        })
      },
      anchor: () => {
        if (options.anchor) {
          note(options.anchor === 'false' ? 'Disabled' : options.anchor, 'Anchor template')
          return Promise.resolve(options.anchor)
        }
        return select({
          message: 'Select an Anchor template',
          options: anchorTemplates.map((choice) => ({
            value: choice,
            label: choice,
          })) as [],
        })
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

export function getUiLibraries(preset: 'next' | 'react'): {
  label: string
  value: string
}[] {
  switch (preset) {
    case 'next':
      return [
        { label: 'None', value: 'none' },
        { label: 'Tailwind', value: 'tailwind' },
      ]
    case 'react':
      return [
        { label: 'None', value: 'none' },
        { label: 'Tailwind', value: 'tailwind' },
      ]
    default:
      return []
  }
}
