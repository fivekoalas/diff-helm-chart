import {getOctokit} from '@actions/github'
import {debug} from '@actions/core'
import {writeFile} from 'node:fs/promises'

type Options = {
  owner: string
  path: string
  ref: string
  repo: string
  outputPath: string
}

export async function downloadRepoFile(
  octokit: ReturnType<typeof getOctokit>,
  {outputPath, ...options}: Options
): Promise<string> {
  debug(
    `Downloading ${options.owner}/${options.repo}@${options.ref}:${options.path}`
  )
  const content = await octokit.rest.repos.getContent({
    ...options,
    mediaType: {format: 'raw'}
  })

  debug(`Writing ${outputPath}`)

  await writeFile(outputPath, content.data as unknown as string)

  return outputPath
}
