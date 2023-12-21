export interface Preset {
  label: string
  value: string
  package: string
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
      version,
    },
    {
      label: 'React + React Router DOM',
      value: 'react',
      package: '@solana-developers/preset-react',
      version,
    },
  ]

  return {
    presets,
    presetValues: presets.map((preset) => preset.value),
  }
}
