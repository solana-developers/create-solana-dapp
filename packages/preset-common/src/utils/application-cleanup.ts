import { Tree } from '@nx/devkit'
import { join } from 'path'

export function applicationCleanup(tree: Tree, path: string) {
  tree.children(path).forEach((file) => tree.delete(join(path, file)))
}
