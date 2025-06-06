import { z } from 'zod'
import { InitScriptInstructionsSchema } from './init-script-instructions-schema'
import { InitScriptRenameSchema } from './init-script-rename-schema'
import { InitScriptVersionsSchema } from './init-script-versions-schema'

export const InitScriptSchema = z
  .object({
    instructions: InitScriptInstructionsSchema.optional(),
    rename: InitScriptRenameSchema.optional(),
    versions: InitScriptVersionsSchema.optional(),
  })
  .optional()

export type InitScript = z.infer<typeof InitScriptSchema>
