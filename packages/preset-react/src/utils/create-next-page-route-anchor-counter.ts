import { names, Tree } from '@nx/devkit'

export function createNextPageRouteAnchorCounter(tree: Tree, path: string, anchorName: string) {
  const { className } = names(anchorName)
  return tree.write(
    path,
    `import ${className}Feature from '@/components/${anchorName}/${anchorName}-feature';

export default function Page() {
  return <${className}Feature />;
}
`,
  )
}
