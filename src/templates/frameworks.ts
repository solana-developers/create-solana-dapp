import { Template } from './templates'

export interface Framework {
  id: string
  name: string
  description: string
  templates: Template[]
}

export const frameworks: Framework[] = [
  {
    id: 'next',
    name: 'Next.js',
    description: 'A React framework by Vercel',
    templates: [
      {
        name: 'gill-next-tailwind',
        description: 'Next.js, Tailwind, gill (based on @solana/kit), Wallet UI',
        repository: 'gh:solana-foundation/templates/templates/template-next-tailwind',
      },
      {
        name: 'gill-next-tailwind-basic',
        description: 'Next.js, Tailwind, basic Anchor example, gill (based on @solana/kit), Wallet UI',
        repository: 'gh:solana-foundation/templates/templates/template-next-tailwind-basic',
      },
      {
        name: 'gill-next-tailwind-counter',
        description: 'Next.js, Tailwind, Anchor Counter Example, gill (based on @solana/kit), Wallet UI',
        repository: 'gh:solana-foundation/templates/templates/template-next-tailwind-counter',
      },
      {
        name: 'web3js-next-tailwind',
        description: 'Legacy Next.js, Tailwind, no Anchor, @solana/web3.js, Wallet Adapter',
        repository: 'gh:solana-foundation/templates/legacy/legacy-next-tailwind',
      },
      {
        name: 'web3js-next-tailwind-basic',
        description: 'Legacy Next.js, Tailwind, basic Anchor example, @solana/web3.js, Wallet Adapter',
        repository: 'gh:solana-foundation/templates/legacy/legacy-next-tailwind-basic',
      },
      {
        name: 'web3js-next-tailwind-counter',
        description: 'Next.js, Tailwind, Anchor Counter Example, @solana/web3.js, Wallet Adapter',
        repository: 'gh:solana-foundation/templates/legacy/legacy-next-tailwind-counter',
      },
    ],
  },
  {
    id: 'node',
    name: 'Node.js',
    description: "JavaScript runtime built on Chrome's V8 engine",
    templates: [
      {
        name: 'gill-node-express',
        description: 'Node Express server with gill',
        repository: 'gh:solana-foundation/templates/templates/template-node-express',
      },
      {
        name: 'gill-node-script',
        description: 'Simple Node script with gill',
        repository: 'gh:solana-foundation/templates/templates/template-node-script',
      },
    ],
  },
  {
    id: 'react-vite',
    name: 'React with Vite',
    description: 'React with Vite and React Router',
    templates: [
      {
        name: 'gill-react-vite-tailwind',
        description: 'React with Vite, Tailwind, gill (based on @solana/kit), Wallet UI',
        repository: 'gh:solana-foundation/templates/templates/template-react-vite-tailwind',
      },
      {
        name: 'gill-react-vite-tailwind-basic',
        description: 'React with Vite, Tailwind, basic Anchor example',
        repository: 'gh:solana-foundation/templates/templates/template-react-vite-tailwind-basic',
      },
      {
        name: 'gill-react-vite-tailwind-counter',
        description: 'React with Vite, Tailwind, Anchor Counter Example',
        repository: 'gh:solana-foundation/templates/templates/template-react-vite-tailwind-counter',
      },
      {
        name: 'web3js-react-vite-tailwind',
        description: 'React with Vite, Tailwind, @solana/web3.js, Wallet Adapter',
        repository: 'gh:solana-foundation/templates/legacy/legacy-react-vite-tailwind',
      },
      {
        name: 'web3js-react-vite-tailwind-basic',
        description: 'React with Vite, Tailwind, basic Anchor example, @solana/web3.js, Wallet Adapter',
        repository: 'gh:solana-foundation/templates/legacy/legacy-react-vite-tailwind-basic',
      },
      {
        name: 'web3js-react-vite-tailwind-counter',
        description: 'React with Vite, Tailwind, Anchor Counter Example, @solana/web3.js, Wallet Adapter',
        repository: 'gh:solana-foundation/templates/legacy/legacy-react-vite-tailwind-counter',
      },
    ],
  },
  {
    id: 'solana-mobile',
    name: 'Solana Mobile',
    description: 'Solana Mobile Templates based on Expo',
    templates: [
      {
        name: 'web3js-expo',
        description: 'Expo React Native app with Mobile Wallet Adapter and @solana/web3.js',
        repository: 'gh:solana-foundation/templates/mobile/web3js-expo',
      },
      {
        name: 'web3js-expo-paper',
        description: 'Expo React Native Paper app with Mobile Wallet Adapter and @solana/web3.js',
        repository: 'gh:solana-foundation/templates/mobile/web3js-expo-paper',
      },
    ],
  },
]
