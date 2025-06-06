import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { z } from 'zod'

export function getPackageJson(targetDirectory: string): PackageJson {
  const packageJson = join(targetDirectory, 'package.json')
  const exists = existsSync(packageJson)
  if (!exists) {
    throw new Error('No package.json found')
  }

  const contents = readFileSync(packageJson, 'utf8')
  if (!contents) {
    throw new Error('Error loading package.json')
  }

  const parsed = PackageJsonSchema.safeParse(JSON.parse(contents))
  if (!parsed.success) {
    throw new Error(`Invalid package.json: ${parsed.error.message}`)
  }

  return parsed.data
}

const PackageJsonSchema = z.object({
  scripts: z.record(z.string()).optional(),
})

export type PackageJson = z.infer<typeof PackageJsonSchema>
