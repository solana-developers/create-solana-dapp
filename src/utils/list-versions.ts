import { getVersion, versionCommands } from './get-version'

export function listVersions() {
  console.log(`Installed versions:`)
  for (const command of Object.keys(versionCommands)) {
    console.log(`  ${versionCommands[command].name}: ${getVersion(command) ?? 'not installed'}`)
  }
}
