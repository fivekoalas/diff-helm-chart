import {action} from './action.js'
import {Input} from './input.js'
import {Output} from './output.js'

export async function run(): Promise<void> {
  try {
    const input = new Input()
    const output = await Output.build(input)
    await action(input, output)
  } catch (error) {
    if (error instanceof Error) Output.failed(error)
  }
}

run()
