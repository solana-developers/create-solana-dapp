export function runCommand(cwd: string, commands: string | string[]) {
  return {
    executor: 'nx:run-commands',
    options: {
      cwd,
      commands: Array.isArray(commands) ? commands : [commands],
      parallel: false,
    },
  }
}
