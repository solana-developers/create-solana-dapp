import { output } from '@nx/devkit'

class Logger {
  private output = output
  constructor(private readonly cliName: string) {
    output.cliName = cliName
  }
  error(title: string) {
    this.output.error({ title })
  }

  log(title: string) {
    this.output.log({ title })
  }

  note(title: string) {
    this.output.note({ title })
  }

  warn(title: string) {
    this.output.warn({ title })
  }
}

export const logger = new Logger('SOLANA')
