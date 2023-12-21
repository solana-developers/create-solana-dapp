import { execSync } from 'node:child_process'

const registry = execSync('npm config get registry').toString().trim()

if (!registry.startsWith('http://localhost:')) {
  console.error(`Expected npm registry to be http://localhost:*, but was ${registry}`)
  console.error('Please run `yarn run local-registry` in another terminal window.')
  process.exit(1)
}
