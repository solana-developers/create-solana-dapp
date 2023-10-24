import { Tree } from '@nx/devkit'
import { join } from 'path'

export function applicationCleanup(tree: Tree, path: string, files: string[] = []) {
  tree.children(path).forEach((file) => {
    if (files.includes(join(path, file)) || !files.length) {
      tree.delete(join(path, file))
    }
  })
}
