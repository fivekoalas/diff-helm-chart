import type {Input} from './input'
import type {Output} from './output'
import {downloadRepoFile} from './utils/download-repo-file'
import {getOctokit} from '@actions/github'
import {exec, getExecOutput} from '@actions/exec'

export const action = async (
  {
    currentChartPath,
    currentValuesOptions,
    targetChartPath,
    targetValuesOptions,
    token
  }: Input,
  output: Output
): Promise<void> => {
  const octokit = getOctokit(token)
  const currentValues = await downloadRepoFile(octokit, currentValuesOptions)
  const targetValues = await downloadRepoFile(octokit, targetValuesOptions)

  const currentArgs = [
    'template',
    currentChartPath,
    '--values',
    currentValues,
    '--output-dir',
    './diff/current'
  ]
  await exec('helm', currentArgs)

  output.startGroup('Current')
  output.info(currentArgs.join(' '))
  output.endGroup()

  const targetArgs = [
    'template',
    targetChartPath,
    '--values',
    targetValues,
    '--output-dir',
    './diff/target'
  ]

  output.startGroup('Target')
  output.info(targetArgs.join(' '))
  output.endGroup()

  await exec('helm', targetArgs)

  const result = await getExecOutput(
    'diff',
    ['--unified', '--recursive', './diff/current', './diff/target'],
    {
      ignoreReturnCode: true
    }
  )

  if (result.exitCode === 0) {
    output.set('changed', 'false')
    output.info('No changes detected')
    return
  }

  output.info('Changes detected')
  output.setDiff(result.stdout)
  output.startGroup('Diff')
  output.info(result.stdout)
  output.endGroup()
}
