import { packageVersion } from '@solana-developers/preset-common'
import { ApplicationReactUi } from './normalize-application-react-schema'

export function getUiDependencies(type: ApplicationReactUi): {
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
