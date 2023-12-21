import { execCapture, formatOutput } from '@solana-developers/e2e-utils'

describe('create-solana-dapp', () => {
  it('should print the help command', async () => {
    const output = execCapture(`npx --yes create-solana-dapp@e2e --help`)
    // Trim all whitespace from the output to make the snapshot more readable
    const trimmed = formatOutput(output)
    expect(trimmed).toMatchSnapshot()
  })
})
