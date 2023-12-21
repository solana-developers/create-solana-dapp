import { packageVersion } from '../../packages/preset-common/src/utils/package-versions'

const pvs: any = { ...packageVersion }

const keys = Object.keys(pvs)

const packages: { name: string; version: string }[] = []

for (const key of keys) {
  if (!key.startsWith('@')) {
    packages.push({ name: key, version: pvs[key] as string })
  } else {
    const subKeys: string[] = Object.keys(pvs[key] as any)
    for (const subKey of subKeys) {
      packages.push({ name: `${key}/${subKey}`, version: pvs[key][subKey] as string })
    }
  }
}

function checkPackageVersionOnNpm(packageName: string) {
  const { execSync } = require('child_process')
  return execSync(`npm view ${packageName} version`).toString().trim()
}

const outdated: { name: string; version: string; latest: string }[] = []

for (const current of packages) {
  const latest = checkPackageVersionOnNpm(current.name)
  if (current.version.replace('^', '') !== latest) {
    outdated.push({ name: current.name, version: current.version, latest })
  } else {
    console.log(`${current.name} is up to date`)
  }
}

for (const outdatedElement of outdated) {
  console.log(`${outdatedElement.name} is outdated: ${outdatedElement.version} -> ${outdatedElement.latest}`)
}
