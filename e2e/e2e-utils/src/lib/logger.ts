import { output } from '@nx/devkit'

class Logger {
  private output = output
  constructor(private readonly cliName: string) {
    output.cliName = cliName
  }
  log(title: string) {
    this.output.log({ title })
  }

  warn(title: string) {
    this.output.warn({ title })
  }

  error(title: string) {
    this.output.error({ title })
  }
}

export const logger = new Logger('E2E')
