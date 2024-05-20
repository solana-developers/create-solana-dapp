export enum PresetType {
  next = 'next',
  react = 'react',
  template = 'template',
}

export interface Preset {
  label: string
  value: string
  package: string
  type: PresetType
  version: string
}

export function getPresets(version: string): {
  presets: Preset[]
  presetValues: string[]
} {
  const presets = [
    {
      label: 'Next.js',
      value: 'next',
      package: '@solana-developers/preset-next',
      type: PresetType.next,
      version,
    },
    {
      label: 'React + React Router DOM',
      value: 'react',
      package: '@solana-developers/preset-react',
      type: PresetType.react,
      version,
    },
    {
      label: 'Solana Mobile Expo Template',
      value: 'solana-mobile/solana-mobile-expo-template',
      package: '',
      type: PresetType.template,
      version: '/',
    },
  ]

  return {
    presets,
    presetValues: presets.map((preset) => preset.value),
  }
}

// Helper function to check if the preset is a template
export function isPresetTemplate(preset: string) {
  // If the preset contains a slash, it's a template and we'll clone it from GitHub.
  return preset?.includes('/') ?? false
}
