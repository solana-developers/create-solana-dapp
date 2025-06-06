import { InitScriptInstructions } from './init-script-instructions-schema'

export function initScriptInstructions(instructions?: InitScriptInstructions, verbose = false): string[] {
  if (!instructions || instructions.length === 0) {
    if (verbose) {
      console.log(`initScriptInstructions: no instructions found`)
    }
    return []
  }
  if (verbose) {
    console.log(`initScriptInstructions: ${instructions.length} instructions found`)
  }
  return instructions
}
