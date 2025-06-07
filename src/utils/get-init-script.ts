import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'zod'

export const initScriptKey = 'create-solana-dapp'

export function getInitScript(targetDirectory: string): InitScript | undefined {
  const packageJson = join(targetDirectory, 'package.json')
  const exists = existsSync(packageJson)
  if (!exists) {
    throw new Error('No package.json found')
  }
  const contents = require(packageJson)
  if (!contents) {
    throw new Error('Error loading package.json')
  }
  const init = contents[initScriptKey]
  if (!init) {
    return undefined
  }
  const parsed = InitScriptSchema.safeParse(init)
  if (!parsed.success) {
    throw new Error(`Invalid init script: ${parsed.error.message}`)
  }
  return parsed.data
}

const InitScriptInstructionsSchema = z.array(z.string())
const InitScriptRenameSchema = z.record(
  z.object({
    to: z.string(),
    paths: z.array(z.string()),
  }),
)
const InitScriptVersionsSchema = z.object({
  adb: z.string().optional(),
  anchor: z.string().optional(),
  solana: z.string().optional(),
})

const InitScriptSchema = z
  .object({
    instructions: InitScriptInstructionsSchema.optional(),
    rename: InitScriptRenameSchema.optional(),
    versions: InitScriptVersionsSchema.optional(),
  })
  .optional()

export type InitScript = z.infer<typeof InitScriptSchema>
export type InitScriptInstructions = z.infer<typeof InitScriptInstructionsSchema>
export type InitScriptRename = z.infer<typeof InitScriptRenameSchema>
export type InitScriptVersions = z.infer<typeof InitScriptVersionsSchema>
