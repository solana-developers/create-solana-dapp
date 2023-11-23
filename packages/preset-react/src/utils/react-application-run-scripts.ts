export function reactApplicationRunScripts({ anchorName, webName }: { anchorName: string; webName: string }) {
  return {
    anchor: `nx run ${anchorName}:anchor`,
    localnet: `nx run ${anchorName}:anchor localnet`,
    build: `nx build ${webName}`,
    dev: `nx serve ${webName}`,
  }
}
