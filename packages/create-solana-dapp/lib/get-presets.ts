export function getPresets(version: string) {
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
    presetChoices: presets.map((preset) => preset.value),
  }
}
