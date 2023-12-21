import { Tree } from '@nx/devkit'

export interface FileContents {
  path: string
  content?: string | string[]
  isBinary?: boolean
  children?: Record<string, FileContents>
}

const binaries = [
  'asset',
  'cginc',
  'dwlt',
  'eot',
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'mat',
  'meta',
  'pdf',
  'png',
  'prefab',
  'shader',
  'svg',
  'ttf',
  'woff',
  'woff2',
  'lock',
]

export function getRecursiveFileContents(tree: Tree, path: string, includeBinaries = false) {
  const contents: Record<string, FileContents> = {}
  const dir = tree.children(path)
  dir.forEach((file) => {
    if (tree.isFile(`${path}/${file}`)) {
      const isBinary = binaries.includes(file.split('.').pop())
      const content = tree.read(`${path}/${file}`)
      const binaryContent = includeBinaries ? content.toString('base64') : null

      contents[file] = {
        path: `${path}/${file}`,
        isBinary,
        content: isBinary ? binaryContent : formatOutput(content.toString('utf-8')),
      }
    } else {
      contents[file] = {
        path: `${path}/${file}`,
        children: getRecursiveFileContents(tree, `${path}/${file}`, includeBinaries),
      }
    }
  })

  return contents
}

export function formatOutput(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}
