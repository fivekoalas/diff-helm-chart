<p align="center">
  <a href="https://github.com/fivekoalas/diff-helm-chart/actions/workflows/codeql-analysis.yml"><img src="https://github.com/fivekoalas/diff-helm-chart/actions/workflows/codeql-analysis.yml/badge.svg?branch=main" alt="CodeQL"></a>
<a href="https://github.com/fivekoalas/diff-helm-chart/actions/workflows/test.yml"><img src="https://github.com/fivekoalas/diff-helm-chart/actions/workflows/test.yml/badge.svg?branch=main" alt="build-test"></a>
</p>

# Diff Helm Chart

A Github action to diff a Helm chart.

## Usage

Add the following step to your workflow:

```yaml
- name: Diff Helm Chart
  uses: fivekoalas/diff-helm-chart@v3
  id: diff
  with:
    targetChartPath: ./target/charts
    currentChartPath: ./current/charts
    valuesPath: ./values.yaml
    currentValuesRepo: fivekoalas/diff-helm-chart
    targetValuesRepo: fivekoalas/diff-helm-chart # optional, defaults to currentValuesRepo
    currentValuesBranch: main # optional, defaults to develop
    targetValuesBranch: main # optional, defaults to develop, overridden by targetBranchRegex on pull requests
    token: ${{ secrets.GITHUB_TOKEN }} # required PAT for private repos, optional for public repos defaults to GITHUB_TOKEN
    targetBranchRegex: 'release-.*' # optional, defaults to 'target: (.*)'
    asMarkdown: true # optional, defaults to true

- name: 'Add PR Comment'
  uses: mshick/add-pr-comment@v2
  if: steps.diff.outputs.changed == 'true'
  with:
    message: ${{ steps.diff.outputs.diff }}
```

## Outputs

| Name             | Description                                      |
| ---------------- | ------------------------------------------------ |
| `changed`        | Whether the charts are different                 |
| `diff`           | The diff between the charts                      |
| `targetTemplate` | The target chart rendered with the target values |

## Upgrading to v3

v3 runs on the `node24` runtime. Self-hosted runners must be on a version that supports Node 24 actions. It also adds the optional `targetValuesBranch` input (defaults to `develop`, the previously hardcoded value); all other inputs and outputs are unchanged from v2.

## License Summary

This code is made available under the MIT license.
