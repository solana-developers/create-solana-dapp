import { z } from 'zod'

export const InitScriptInstructionsSchema = z.array(z.string())

export type InitScriptInstructions = z.infer<typeof InitScriptInstructionsSchema>
