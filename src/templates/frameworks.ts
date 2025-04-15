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
      // {
      //   name: 'next-tailwind-counter',
      //   description: 'Next.js + Tailwind CSS + Anchor Counter Example',
      //   repository: 'gh:solana-developers/solana-templates/templates/template-next-tailwind-counter',
      // },
      // {
      //   name: 'next-tailwind-basic',
      //   description: 'Next.js + Tailwind CSS + Anchor Basic Example',
      //   repository: 'gh:solana-developers/solana-templates/templates/template-next-tailwind-basic',
      // },
      {
        name: 'next-tailwind',
        description: 'Next.js + Tailwind CSS, no Anchor',
        repository: 'gh:solana-developers/solana-templates/templates/template-next-tailwind',
      },
    ],
  },
  {
    id: 'node',
    name: 'Node.js',
    description: "JavaScript runtime built on Chrome's V8 engine",
    templates: [
      {
        name: 'node-express',
        description: 'Node Express server with gill',
        repository: 'gh:solana-developers/solana-templates/templates/template-node-express',
      },
      {
        name: 'node-script',
        description: 'Simple Node script with gill',
        repository: 'gh:solana-developers/solana-templates/templates/template-node-script',
      },
    ],
  },
  {
    id: 'react-vite',
    name: 'React with Vite',
    description: 'React with Vite and React Router',
    templates: [
      // {
      //   name: 'react-vite-tailwind-counter',
      //   description: 'React with Vite + Tailwind CSS + Anchor Counter Example',
      //   repository: 'gh:solana-developers/solana-templates/templates/template-react-vite-tailwind-counter',
      // },
      // {
      //   name: 'react-vite-tailwind-basic',
      //   description: 'React with Vite + Tailwind CSS + Anchor Basic Example',
      //   repository: 'gh:solana-developers/solana-templates/templates/template-react-vite-tailwind-basic',
      // },
      {
        name: 'react-vite-tailwind',
        description: 'React with Vite + Tailwind CSS, no Anchor',
        repository: 'gh:solana-developers/solana-templates/templates/template-react-vite-tailwind',
      },
    ],
  },
  {
    id: 'legacy',
    name: 'Legacy templates',
    description: 'Templates using @solana/web3.js',
    templates: [
      {
        name: 'legacy-next-tailwind-counter',
        description: 'Next.js + Tailwind CSS + Anchor Counter Example',
        repository: 'gh:solana-developers/solana-templates/legacy/legacy-next-tailwind-counter',
      },
      {
        name: 'legacy-next-tailwind-basic',
        description: 'Next.js + Tailwind CSS + Anchor Basic Example',
        repository: 'gh:solana-developers/solana-templates/legacy/legacy-next-tailwind-basic',
      },
      {
        name: 'legacy-next-tailwind',
        description: 'Next.js + Tailwind CSS, no Anchor',
        repository: 'gh:solana-developers/solana-templates/legacy/legacy-next-tailwind',
      },
      {
        name: 'legacy-react-vite-tailwind-counter',
        description: 'React with Vite + Tailwind CSS + Anchor Counter Example',
        repository: 'gh:solana-developers/solana-templates/legacy/legacy-react-vite-tailwind-counter',
      },
      {
        name: 'legacy-react-vite-tailwind-basic',
        description: 'React with Vite + Tailwind CSS + Anchor Basic Example',
        repository: 'gh:solana-developers/solana-templates/legacy/legacy-react-vite-tailwind-basic',
      },
      {
        name: 'legacy-react-vite-tailwind',
        description: 'React with Vite + Tailwind CSS, no Anchor',
        repository: 'gh:solana-developers/solana-templates/legacy/legacy-react-vite-tailwind',
      },
    ],
  },
]
