import { execSync } from 'child_process'
import * as process from 'process'

export function execCapture(command: string, { cwd }: { cwd?: string } = { cwd: process.cwd() }) {
  const result = execSync(command, {
    cwd,
    stdio: 'pipe',
    env: process.env,
  })

  return result.toString()
}

// Break a string up in lines, trim whitespace, and remove empty lines and multiple spaces
export function formatOutput(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/\s+/g, ' '))
    .join('\n')
}
