import { getPackageJson } from './get-package-json'
import { InitScript, InitScriptSchema } from './init-script-schema'

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
