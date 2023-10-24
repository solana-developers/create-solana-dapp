import { packageVersion } from '@solana-developers/preset-common'
import { ApplicationReactUiLibrary } from '../generators/application/application-react-schema'

export function getUiDependencies(type: ApplicationReactUiLibrary): {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
} {
  switch (type) {
    case 'tailwind':
      return {
        dependencies: {
          daisyui: packageVersion.daisyui,
          '@tailwindcss/typography': packageVersion['@tailwindcss'].typography,
        },
      }
    default:
      return {}
  }
}
