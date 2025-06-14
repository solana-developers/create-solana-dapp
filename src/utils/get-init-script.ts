import { writeFileSync } from 'node:fs'
import { z } from 'zod'
import { getPackageJson } from './get-package-json'

export const initScriptKey = 'create-solana-dapp'

export function getInitScript(targetDirectory: string): InitScript | undefined {
  const { contents } = getPackageJson(targetDirectory)
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
  const { path, contents } = getPackageJson(targetDirectory)
  delete contents[initScriptKey]
  writeFileSync(path, JSON.stringify(contents, undefined, 2) + '\n')
}

const InitScriptVersionsSchema = z.object({
  adb: z.string().optional(),
  anchor: z.string().optional(),
  solana: z.string().optional(),
})

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
    versions: InitScriptVersionsSchema.optional(),
  })
  .optional()

export type InitScript = z.infer<typeof InitScriptSchema>
export type InitScriptVersions = z.infer<typeof InitScriptVersionsSchema>
