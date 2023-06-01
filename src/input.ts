import {getInput} from '@actions/core'
import {context} from '@actions/github'

export class Input {
  get token(): string {
    return getInput('token')
  }

  get targetValuesOptions(): Record<
    'path' | 'ref' | 'owner' | 'repo' | 'outputPath',
    string
  > {
    const ownerWithRepo =
      getInput('targetValuesRepo') || getInput('currentValuesRepo')
    const [owner, repo] = ownerWithRepo.split('/')
    const path = getInput('valuesPath')
    let ref = 'develop'

    if (context.eventName === 'pull_request') {
      const regex = new RegExp(getInput('targetBranchRegex'))
      const payload = context.payload.pull_request
      const body = payload?.body ?? ''
      const match = regex.exec(body)
      if (match) {
        ref = match[1]
      }
    }

    return {path, ref, owner, repo, outputPath: 'values-target.yaml'}
  }

  get currentValuesOptions(): Record<
    'path' | 'ref' | 'owner' | 'repo' | 'outputPath',
    string
  > {
    const [owner, repo] = getInput('currentValuesRepo').split('/')
    return {
      owner,
      repo,
      ref: getInput('currentValuesBranch'),
      path: getInput('valuesPath'),
      outputPath: 'values-current.yaml'
    }
  }

  get targetChartPath(): string {
    return getInput('targetChartPath')
  }

  get currentChartPath(): string {
    return getInput('currentChartPath')
  }

  get asMarkdown(): boolean {
    return getInput('asMarkdown') === 'true'
  }
}
