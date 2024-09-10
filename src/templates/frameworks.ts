import { Template } from './templates'

export interface Framework {
  id: string
  name: string
  description: string
  templates: Template[]
}

export const defaultRepository = `github:solana-developers/template-{{name}}`

export const frameworks: Framework[] = [
  {
    id: 'next',
    name: 'Next.js',
    description: 'A React framework by Vercel',
    templates: [
      {
        name: 'next-tailwind-counter',
        description: 'Next.js + Tailwind CSS + Anchor Counter Example',
        repository: defaultRepository,
      },
      {
        name: 'next-tailwind-basic',
        description: 'Next.js + Tailwind CSS + Anchor Basic Example',
        repository: defaultRepository,
      },
      {
        name: 'next-tailwind',
        description: 'Next.js + Tailwind CSS, no Anchor',
        repository: defaultRepository,
      },
    ],
  },
  {
    id: 'react-vite',
    name: 'React with Vite',
    description: 'React with Vite and React Router',
    templates: [
      {
        name: 'react-vite-tailwind-counter',
        description: 'React with Vite + Tailwind CSS + Anchor Counter Example',
        repository: defaultRepository,
      },
      {
        name: 'react-vite-tailwind-hello-world',
        description: 'React with Vite + Tailwind CSS + Anchor Hello World Example',
        repository: defaultRepository,
      },
      {
        name: 'react-vite-tailwind',
        description: 'React with Vite + Tailwind CSS, no Anchor',
        repository: defaultRepository,
      },
    ],
  },
]
