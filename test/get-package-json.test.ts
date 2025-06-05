import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fs, vol } from 'memfs'
import { getPackageJson } from '../src/utils/get-package-json'

vi.mock('node:fs')

describe('getPackageJson', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should throw an error when package.json does not exist', () => {
    expect(() => getPackageJson('/template')).toThrow('No package.json found')
  })

  it('should throw an error when package.json is empty', () => {
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', '')

    expect(() => getPackageJson('/template')).toThrow('Error loading package.json')
  })

  it('should throw an error when package.json cannot be parsed', () => {
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', 'invalid json')

    expect(() => getPackageJson('/template')).toThrow('Unexpected token \'i\', "invalid json" is not valid JSON')
  })

  it('should throw an error when package.json does not match schema', () => {
    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify({ scripts: 'data' }))

    expect(() => getPackageJson('/template')).toThrow(`Invalid package.json: [
  {
    "code": "invalid_type",
    "expected": "object",
    "received": "string",
    "path": [
      "scripts"
    ],
    "message": "Expected object, received string"
  }
]`)
  })

  it('should return package.json content when file exists', () => {
    const packageJson = { scripts: { dev: 'vite', start: 'node server.js' } }

    fs.mkdirSync('/template')
    fs.writeFileSync('/template/package.json', JSON.stringify(packageJson))

    expect(getPackageJson('/template')).toEqual(packageJson)
  })
})
