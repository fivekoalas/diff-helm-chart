import {getOctokit} from '@actions/github'
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
  const content = await octokit.rest.repos.getContent({
    ...options,
    mediaType: {format: 'raw'}
  })

  await writeFile(outputPath, content.data as unknown as string)

  return outputPath
}
