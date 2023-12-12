import { program } from 'commander'
import * as fs from 'fs'
import * as prettier from 'prettier'

import { readJsonFile } from 'nx/src/utils/fileutils'
import { join } from 'path'
import { execCapture } from '../../e2e/e2e-utils/src'

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
    .name('sync-readmes')
    .option('--dry-run', 'Dry run (default: false)', false)
    .option('--check', `Check if README's are up to date, exit with code 1 if not (default: false)`, false)
    .parse(process.argv)
    .opts()

  const packagesRoot = join(__dirname, '../../packages')
  const generators = findGenerators(packagesRoot) ?? []
  const changes: { file: string; schema: string }[] = []

  for (const generator of generators) {
    if (!generator) {
      continue
    }
    const packageReadmePath = `${packagesRoot}/${generator.pkg}/README.md`
    const packageReadme = fs.readFileSync(packageReadmePath).toString()

    const packageJsonPath = `${packagesRoot}/${generator.pkg}/package.json`
    const packageJson = readJsonFile(packageJsonPath)
    const { name } = packageJson

    const generatorJson = JSON.parse(fs.readFileSync(generator.generatorPath).toString())
    const generators = Object.keys(generatorJson.generators)

    const readmes = generators.map((generatorName) => {
      const generator = generatorJson.generators[generatorName]
      const schemaPath = join(generator.schema)

      const generatorHelpOutput = execCapture(`nx generate ${name}:${generatorName} --help`)
        // Remove any double newlines
        .replace(/\n\n/g, '\n')
      return { generatorHelpOutput, generatorName, schemaPath }
    })

    const constructedReadme = `# ${name}

${defaultDescription(generator.pkg as any)}

## Supported generators
${readmes
  .map((readme) => {
    const { generatorHelpOutput, generatorName } = readme
    const help = generatorHelpOutput
      .split('\n')
      .slice(1)
      .map((line) => line.replace('nx ', 'yarn nx '))
      .join('\n')
    return `
### ${generatorName}

\`\`\`bash
${help.trim()}
\`\`\`
`
  })
  .join('\n')}
${defaultFooter()}`
    const formatted = prettier.format(constructedReadme, {
      parser: 'markdown',
      singleQuote: true,
      printWidth: 120,
      semi: false,
      trailingComma: 'all',
      arrowParens: 'always',
      endOfLine: 'auto',
      proseWrap: 'always',
    })

    // If the README is up-to-date, skip
    if (packageReadme === formatted) {
      continue
    }

    // If the README is not up-to-date, add it to the list of changes

    changes.push({ file: packageReadmePath, schema: formatted })
  }

  if (result.check && changes.length > 0) {
    console.log(
      `❌  Some README's are not up to date:\n - ${changes
        .map((change) => change.file.replace(packagesRoot, 'packages'))
        .join('\n - ')}`,
    )
    console.log(`Run 'yarn sync-readmes' to update them.`)
    process.exit(1)
  }

  if (changes.length === 0) {
    console.log(`✔ All README's are up to date`)
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

export function defaultDescription(pkg: 'preset-anchor' | 'preset-common' | 'preset-next' | 'preset-react') {
  const base = 'This library is a preset for [create-solana-dapp](https://npm.im/create-solana-dapp)'
  const template = (library: string) => `${base} that adds ${library} support to your project.`

  switch (pkg) {
    case 'preset-anchor':
      return template('[Anchor](https://www.anchor-lang.com/)')
    case 'preset-common':
      return `${base} with shared code for the other presets.`
    case 'preset-next':
      return template('[Next.js](https://nextjs.org/)')
    case 'preset-react':
      return template('[React](https://react.dev)')
  }
}

export function defaultFooter() {
  return `## More information

- [GitHub repository](https://github.com/solana-developers/create-solana-dapp)
- [npm package](https://npm.im/create-solana-dapp)
- [StackOverflow](https://solana.stackexchange.com/questions/tagged/create-solana-dapp)
`
}
