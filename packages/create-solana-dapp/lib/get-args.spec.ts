import { getArgs } from './get-args'

describe('get-args', () => {
  it('should get args with minimal parameters', async () => {
    const result = await getArgs(['', '', 'my-app', '--preset', 'next'])
    expect(result).toMatchSnapshot()
  })

  it.each([
    '--preset next',
    '--preset react',
    '--preset react --anchor false',
    '--preset react --anchor-template hello-world --anchor-name program',
  ])('should get args with preset: %s', async (preset: string) => {
    const result = await getArgs(['', '', 'my-app', ...preset.split(' ')])

    expect(result).toMatchSnapshot()
  })
})
