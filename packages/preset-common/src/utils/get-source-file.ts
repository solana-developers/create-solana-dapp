import { Tree } from '@nx/devkit'
import { Project, SourceFile } from 'ts-morph'

export function getSourceFile(tree: Tree, path: string): SourceFile {
  // Get the Source
  const source = tree.read(path).toString('utf-8')

  // Create new ts-morph Project
  const project = new Project()

  // Add Source File
  return project.createSourceFile(path, source, { overwrite: true })
}
