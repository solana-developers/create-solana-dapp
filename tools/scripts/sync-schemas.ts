import { program } from 'commander'
import * as fs from 'fs'
import { compileFromFile } from 'json-schema-to-typescript'
import { join } from 'path'

const GENERATOR_FILE = 'generators.json'

function findGenerators(root: string) {
  const packages = fs.readdirSync(root)
  return packages
    .map((pkg: string) => {
      const generatorPath = join(root, pkg, GENERATOR_FILE)
      if (fs.existsSync(generatorPath)) {
        return { pkg, generatorPath }
      }
    })
    .filter(Boolean)
}

async function main() {
  const result = program
    .name('sync-schemas')
    .option('--dry-run', 'Dry run (default: false)', false)
    .option('--check', 'Check if schemas are up to date, exit with code 1 if not (default: false)', false)
    .parse(process.argv)
    .opts()

  const packagesRoot = join(__dirname, '../../packages')
  const generators = findGenerators(packagesRoot) ?? []
  const changes: { file: string; schema: string }[] = []

  for (const generator of generators) {
    if (!generator) {
      continue
    }
    const generatorJson = JSON.parse(fs.readFileSync(generator.generatorPath).toString())
    const generators = Object.keys(generatorJson.generators)
    const schemas = generators.map((generatorName) => {
      const generator = generatorJson.generators[generatorName]
      const schemaPath = join(generator.schema)
      return { generatorName, schemaPath }
    })

    for (const schema of schemas) {
      const schemaPath = join(packagesRoot, generator.pkg, schema.schemaPath)
      if (!fs.existsSync(schemaPath)) {
        console.log(
          `Schema not found for ${generator.pkg} (${schemaPath.replace(
            process.cwd(),
            '',
          )}). Check the reference in ${join(
            packagesRoot.replace(process.cwd(), ''),
            generator.pkg,
            'generators.json',
          )}`,
        )
        continue
      }
      const schemaPathDts = schemaPath.replace('schema.json', 'schema.d.ts')
      const schemaPathDtsBefore = fs.readFileSync(schemaPathDts).toString()

      await compileFromFile(schemaPath, {
        additionalProperties: false,
      }).then((schema) => {
        if (JSON.stringify(schemaPathDtsBefore) !== JSON.stringify(schema)) {
          changes.push({ file: schemaPathDts, schema })
        }
      })
    }
  }

  if (result.check && changes.length > 0) {
    console.log(
      `❌  Some schemas are not up to date:\n - ${changes
        .map((change) => change.file.replace(packagesRoot, 'packages'))
        .join('\n - ')}`,
    )
    console.log(`Run 'yarn sync-schemas' to update them.`)
    process.exit(1)
  }

  if (changes.length === 0) {
    console.log(`✔ All schemas are up to date`)
    return
  }

  for (const change of changes) {
    if (result.dryRun) {
      console.log(`Would update ${change.file.replace(packagesRoot, 'packages')} (dry run)`)
      continue
    }
    fs.writeFileSync(change.file, change.schema)
    console.log(`Updated ${change.file.replace(packagesRoot, 'packages')}`)
  }
}

main()
