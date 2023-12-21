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
          '@tailwindcss/typography': packageVersion['@tailwindcss'].typography,
          '@tabler/icons-react': packageVersion['@tabler']['icons-react'],
          '@tanstack/react-query': packageVersion['@tanstack']['react-query'],
          'react-hot-toast': packageVersion['react-hot-toast'],
          daisyui: packageVersion.daisyui,
          jotai: packageVersion.jotai,
        },
      }
    default:
      return {}
  }
}
