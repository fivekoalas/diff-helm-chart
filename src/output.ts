import {
  setFailed,
  setOutput,
  debug,
  startGroup,
  endGroup,
  info
} from '@actions/core'
import {Input} from './input'

export class Output {
  input: Input

  private constructor(input: Input) {
    this.input = input
  }

  static async build(input: Input): Promise<Output> {
    return new Output(input)
  }

  debug = debug
  endGroup = endGroup
  startGroup = startGroup
  static failed = setFailed
  set = setOutput
  info = info

  setDiff(diff: string): void {
    if (this.input.asMarkdown) {
      diff = `\`\`\`diff\n${diff}\n\`\`\``
    }

    this.set('diff', diff)
    this.set('changed', 'true')
  }
}
