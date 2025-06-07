import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { GetArgsResult } from './get-args-result'
import { initScriptKey } from './get-init-script'

export function initScriptDelete(args: GetArgsResult) {
  const packageJson = join(args.targetDirectory, 'package.json')
  const contents = require(packageJson)
  delete contents[initScriptKey]
  writeFileSync(packageJson, JSON.stringify(contents, undefined, 2) + '\n')
  if (args.verbose) {
    console.log(`initScriptDelete: deleted ${initScriptKey} from package.json`)
  }
}
