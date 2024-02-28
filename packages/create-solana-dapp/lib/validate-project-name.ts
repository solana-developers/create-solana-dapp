import { existsSync } from 'fs'

export function validateProjectName(name: string): string | void {
  // Name must be a valid directory name
  if (!/^[a-z0-9_-]+$/i.test(name)) {
    return 'Please enter a valid directory name (alphanumeric characters and dashes only)'
  }
  // Name must be at least 1 character long
  if (name.length < 1) {
    return 'Please enter at least 1 character'
  }
  // Check if the directory already exists
  if (existsSync(name)) {
    return 'Directory already exists'
  }
}
