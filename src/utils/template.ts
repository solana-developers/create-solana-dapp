import { TemplateJsonTemplate } from '@beeman/repokit'

export interface Template extends Omit<TemplateJsonTemplate, 'keywords' | 'path'> {
  keywords?: string[]
  path?: string
}
