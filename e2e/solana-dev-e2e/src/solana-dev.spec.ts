import { execCapture, formatOutput } from '@solana-developers/e2e-utils'

describe('solana-dev', () => {
  it('should print the help command', async () => {
    const output = execCapture(`npx --yes solana-dev@e2e --help`)
    // Trim all whitespace from the output to make the snapshot more readable
    const trimmed = formatOutput(output)
    expect(trimmed).toMatchSnapshot()
  })
})
