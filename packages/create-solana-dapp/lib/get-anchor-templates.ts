export interface AnchorTemplate {
  label: string
  value: string
}

export function getAnchorTemplates(): {
  anchorTemplates: AnchorTemplate[]
  anchorTemplateValues: string[]
} {
  const anchorTemplates = [
    {
      label: 'Anchor Counter program with tests',
      value: 'counter',
    },
    {
      label: 'Basic Anchor program with tests',
      value: 'basic',
    },
    {
      label: 'Do not include Anchor in the project',
      value: 'none',
    },
  ]

  return {
    anchorTemplates,
    anchorTemplateValues: anchorTemplates.map((template) => template.value),
  }
}
