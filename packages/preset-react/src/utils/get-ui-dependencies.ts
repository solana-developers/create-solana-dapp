import { packageVersion } from '@solana-developers/preset-common'
import { ReactApplicationUi } from './normalize-react-application-schema'

export function getUiDependencies(type: ReactApplicationUi): {
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
