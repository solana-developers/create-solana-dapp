import { Tree } from '@nx/devkit'
import { SourceFile } from 'ts-morph'
import { getSourceFile } from './get-source-file'

export function updateSourceFile(tree: Tree, path: string, updateFn: (source: SourceFile) => SourceFile) {
  tree.write(path, updateFn(getSourceFile(tree, path)).getFullText())
}
