import {action} from './action'
import {Input} from './input'
import {Output} from './output'

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
