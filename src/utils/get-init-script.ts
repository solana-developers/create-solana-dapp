import { existsSync, writeFileSync } from 'node:fs'
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

export function deleteInitScript(targetDirectory: string) {
  const packageJson = join(targetDirectory, 'package.json')
  const contents = require(packageJson)
  delete contents[initScriptKey]
  writeFileSync(packageJson, JSON.stringify(contents, undefined, 2))
}

const InitScriptSchema = z
  .object({
    instructions: z.array(z.string()).optional(),
    rename: z
      .record(
        z.object({
          to: z.string(),
          paths: z.array(z.string()),
        }),
      )
      .optional(),
    versions: z.object({
      anchor: z.string().optional(),
      solana: z.string().optional(),
    }),
  })
  .optional()

export type InitScript = z.infer<typeof InitScriptSchema>
