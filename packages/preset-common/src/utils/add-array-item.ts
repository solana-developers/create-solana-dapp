import { SourceFile, ts } from 'ts-morph'

export function addArrayItem(source: SourceFile, { name, content }: { name: string; content: string }) {
  const array = getArrayItem(source, name)

  if (array) {
    array.addElement(content)
  }
  return source
}

export function getArrayItem(source: SourceFile, name: string) {
  return source.getVariableDeclaration(name)?.getInitializerIfKind(ts.SyntaxKind.ArrayLiteralExpression)
}
