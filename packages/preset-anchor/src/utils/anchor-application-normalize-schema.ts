import { AnchorApplicationSchema } from '../'

export function anchorApplicationNormalizeSchema(options: AnchorApplicationSchema): AnchorApplicationNormalizedSchema {
  return {
    ...options,
    skipFormat: options.skipFormat ?? false,
    template: options.template ?? 'none',
  }
}

export type AnchorApplicationNormalizedSchema = Required<AnchorApplicationSchema>
export type AnchorApplicationTemplate = AnchorApplicationSchema['template']
