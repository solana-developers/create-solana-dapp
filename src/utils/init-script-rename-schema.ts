import { z } from 'zod'

export const InitScriptRenameSchema = z.record(
  z.object({
    to: z.string(),
    paths: z.array(z.string()),
  }),
)

export type InitScriptRename = z.infer<typeof InitScriptRenameSchema>
