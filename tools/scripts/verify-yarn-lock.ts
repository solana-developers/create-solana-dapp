import { readFileSync } from 'fs'

const lockFile: string = './yarn.lock'
const needle: string = 'http://localhost'

// Read the lock file
const lockFileContents = readFileSync(lockFile, 'utf8')

// Split the file into lines
const lines = lockFileContents.split('\n')

// Make sure none of the lines has the needle
const offendingLines = lines.filter((line) => line.includes(needle))

if (offendingLines.length > 0) {
  console.error(`‼️Found ${offendingLines.length} lines with ${needle} in ${lockFile}.`)
  process.exit(1)
}

console.log(`✔ No lines with ${needle} found in ${lockFile}`)
