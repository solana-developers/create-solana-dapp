import { PackageManager } from 'nx/src/utils/package-manager'
import { getArgs } from './get-args'

describe('get-args', () => {
  describe('expected args', () => {
    it('should get args with minimal parameters', async () => {
      const result = await getArgs(['', '', 'my-app', '--preset', 'next', '--ui', 'tailwind', '--anchor', 'counter'])
      expect(result.packageManager).toBe('npm')
      expect(result).toMatchSnapshot()
    })

    it.each(['npm', 'yarn', 'pnpm'])(
      `should get args with minimal parameters and package manager %s`,
      async (pm: PackageManager) => {
        const result = await getArgs(
          ['', '', 'my-app', '--preset', 'next', '--ui', 'tailwind', '--anchor', 'counter'],
          pm,
        )
        expect(result).toMatchSnapshot()
      },
    )

    it.each([
      '--preset next --ui tailwind --anchor counter',
      '--preset react --ui tailwind --anchor counter',
      '--preset react --anchor none --ui none',
      '--preset react --anchor counter --anchor-name program --ui tailwind --anchor-program some-counter',
      '--preset=react --anchor=counter --anchor-name=program --ui=tailwind --anchor-program=another-counter',
      '--preset=react --anchor=counter --anchor-name=program --anchor-build --ui=tailwind --anchor-program=my-third-counter',
      '--preset react --anchor none --ui none --pnpm',
      '--preset react --anchor none --ui none --yarn',
      '--preset react --anchor none --ui none --web-port=4200',
    ])('should get args with preset: %s', async (preset: string) => {
      const result = await getArgs(['', '', 'my-app', ...preset.split(' ')])

      expect(result).toMatchSnapshot()
    })
  })

  describe('unexpected args', () => {
    it('should fail with invalid preset', async () => {
      expect.assertions(1)
      try {
        await getArgs(['', '', 'my-app', '--preset', 'invalid'])
      } catch (e) {
        expect(e.message).toContain('Invalid preset: invalid')
      }
    })

    it('should fail with invalid anchor template', async () => {
      expect.assertions(1)
      try {
        await getArgs(['', '', 'my-app', '--preset', 'react', '--anchor', 'invalid'])
      } catch (e) {
        expect(e.message).toContain('Invalid anchor template: invalid')
      }
    })

    it('should fail with invalid ui library', async () => {
      expect.assertions(1)
      try {
        const x = await getArgs(['', '', 'my-app', '--preset', 'react', '--ui', 'jquery-ui'])
        console.log(x)
      } catch (e) {
        expect(e.message).toContain('Invalid ui library for preset react: jquery-ui')
      }
    })

    it('should fail with two package managers', async () => {
      expect.assertions(1)
      try {
        const x = await getArgs([
          '',
          '',
          'my-app',
          '--preset',
          'react',
          '--ui',
          'none',
          '--anchor',
          'none',
          '--yarn',
          '--pnpm',
        ])
        console.log(x)
      } catch (e) {
        expect(e.message).toContain('Both pnpm and yarn were specified. Please specify only one.')
      }
    })
  })
})
