import { z } from 'zod'

export const InitScriptVersionsSchema = z.object({
  adb: z.string().optional(),
  anchor: z.string().optional(),
  solana: z.string().optional(),
})

export type InitScriptVersions = z.infer<typeof InitScriptVersionsSchema>
