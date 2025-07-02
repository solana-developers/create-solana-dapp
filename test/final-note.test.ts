import { fs, vol } from 'memfs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { finalNote, FinalNoteArgs } from '../src/utils/final-note'

vi.mock('node:fs')

describe('finalNote', () => {
  beforeEach(() => {
    vol.reset()
  })

  const baseArgs: FinalNoteArgs = {
    app: { name: 'test-app', version: '1.0.0' },
    dryRun: false,
    name: 'test-project',
    targetDirectory: '/template',
    packageManager: 'npm',
    skipGit: false,
    skipInit: false,
    skipInstall: false,
    template: { name: 'basic', description: 'description', repository: '/template' },
    verbose: false,
    target: 'test-project',
    instructions: [],
  }

  it('should include install instructions when skipInstall is true', () => {
    const packageJson = { scripts: { dev: 'vite', start: 'node server.js' } }
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify(packageJson))

    const result = finalNote({ ...baseArgs, skipInstall: true })

    expect(result).toContain('Install dependencies:')
    expect(result).toContain('npm install')
  })

  it('should not include install instructions when skipInstall is false', () => {
    const packageJson = { scripts: { dev: 'vite', start: 'node server.js' } }
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify(packageJson))

    const result = finalNote({ ...baseArgs, skipInstall: false })

    expect(result).not.toContain('Install dependencies:')
    expect(result).not.toContain('npm install')
  })

  it('should use yarn when packageManager is yarn and skipInstall is true', () => {
    const packageJson = { scripts: { dev: 'vite', start: 'node server.js' } }
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify(packageJson))

    const result = finalNote({
      ...baseArgs,
      skipInstall: true,
      packageManager: 'yarn' as FinalNoteArgs['packageManager'],
    })

    expect(result).toContain('yarn install')
  })

  it('should show the start script if there is no instructions array', () => {
    const packageJson = { scripts: { dev: 'vite', start: 'node server.js' } }
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify(packageJson))

    const result = finalNote({ ...baseArgs, instructions: [] })

    expect(result).toContain('Start the app:')
    expect(result).toContain('npm run dev')
  })

  it('should show the start script and instructions if they are provided', () => {
    const packageJson = { scripts: { dev: 'vite', start: 'node server.js' } }
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify(packageJson))

    const result = finalNote({ ...baseArgs, instructions: ['Start the Expo dev server:', 'npm run android'] })

    expect(result).toContain('Start the Expo dev server:')
    expect(result).toContain('npm run android')
    expect(result).not.toContain('Start the app:')
    expect(result).not.toContain('npm run dev')
  })
})
