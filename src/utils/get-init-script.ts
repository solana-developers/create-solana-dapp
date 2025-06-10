import { existsSync, writeFileSync } from 'node:fs'
import { z } from 'zod'
import { getPackageJsonPath } from './get-package-json-path'

export const initScriptKey = 'create-solana-dapp'

export function getInitScript(targetDirectory: string): InitScript | undefined {
  const packageJson = getPackageJsonPath(targetDirectory)
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
  const packageJson = getPackageJsonPath(targetDirectory)
  const contents = require(packageJson)
  delete contents[initScriptKey]
  writeFileSync(packageJson, JSON.stringify(contents, undefined, 2) + '\n')
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
    versions: z
      .object({
        adb: z.string().optional(),
        anchor: z.string().optional(),
        solana: z.string().optional(),
      })
      .optional(),
  })
  .optional()

export type InitScript = z.infer<typeof InitScriptSchema>
