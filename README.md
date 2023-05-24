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
  uses: fivekoalas/diff-helm-chart@v1
  id: diff
  with:
    targetChartPath: ./target/charts
    currentChartPath: ./current/charts
    valuesPath: ./values.yaml
    targetValuesRepo: fivekoalas/diff-helm-chart
    token: ${{ secrets.GITHUB_TOKEN }} # required for private repos

- name: 'Add PR Comment'
  uses: mshick/add-pr-comment@v2
  if: steps.diff.outputs.changed == 'true'
  with:
    message: ${{ steps.diff.outputs.diff }}
```

## License Summary

This code is made available under the MIT license.
