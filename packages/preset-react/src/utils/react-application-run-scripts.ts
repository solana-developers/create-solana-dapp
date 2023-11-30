export function reactApplicationRunScripts({ anchorName, webName }: { anchorName: string; webName: string }) {
  return {
    anchor: `nx run ${anchorName}:anchor`,
    'anchor-build': `nx run ${anchorName}:anchor build`,
    'anchor-localnet': `nx run ${anchorName}:anchor localnet`,
    'anchor-test': `nx run ${anchorName}:anchor test`,
    build: `nx build ${webName}`,
    dev: `nx serve ${webName}`,
  }
}
