import { AnchorApplicationSchema } from '../'

export function anchorApplicationNormalizeSchema(options: AnchorApplicationSchema): AnchorApplicationNormalizedSchema {
  return {
    ...options,
    programName: options.programName ?? options.name,
    skipFormat: options.skipFormat ?? false,
    template: options.template ?? 'none',
  }
}

export type AnchorApplicationNormalizedSchema = Required<AnchorApplicationSchema>
export type AnchorApplicationTemplate = AnchorApplicationSchema['template']
