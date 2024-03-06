import { NormalizedReactApplicationSchema } from './normalize-react-application-schema'

export function reactApplicationRunScripts({
  anchor,
  anchorName,
  webName,
}: {
  anchor: NormalizedReactApplicationSchema['anchor']
  anchorName: string
  webName: string
}) {
  const scripts = {
    build: `nx build ${webName}`,
    dev: `nx serve ${webName}`,
  }
  if (anchor !== 'none') {
    return {
      anchor: `nx run ${anchorName}:anchor`,
      'anchor-build': `nx run ${anchorName}:anchor build`,
      'anchor-localnet': `nx run ${anchorName}:anchor localnet`,
      'anchor-test': `nx run ${anchorName}:anchor test`,
      feature: `nx generate @solana-developers/preset-react:feature`,
      ...scripts,
    }
  }
  return scripts
}
