import { Registry, validateRegistry } from './validate-registry'

export const defaultIndex = `https://raw.githubusercontent.com/solana-developers/solana-templates/refs/heads/main/index.json`
export const solanaTemplatesIndex = process.env.SOLANA_TEMPLATES_INDEX ?? defaultIndex

export async function getRegistry(): Promise<Registry> {
  const result = await fetch(solanaTemplatesIndex)

  if (!result.ok) {
    throw new Error(`Failed to fetch registry index file: ${solanaTemplatesIndex}`)
  }

  return validateRegistry(await result.json())
}
