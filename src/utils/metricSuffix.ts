import type { MetricType } from '@customtypes/metricSuffix'

const SI_SYMBOL = [
  ['', 'k', 'M', 'G', 'T', 'P', 'E'],
  ['', 'm', 'μ', 'n', 'p', 'f', 'a'],
]

const metric = (number: number): MetricType => {
  // eslint-disable-next-line no-bitwise
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3) | 0
  const n = tier < 0 ? 1 : 0
  const t = Math.abs(tier)
  const scale = Math.pow(10, tier * 3)
  return {
    number: number,
    symbol: SI_SYMBOL[n][t],
    scale: scale,
    scaled: number / scale,
  }
}

const metricSuffix = (number: number, precision = 3): string => {
  const m = metric(number)
  return `${
    typeof precision === 'number' ? m.scaled.toFixed(precision) : m.scaled
  }${m.symbol}`
}

export { metric, metricSuffix }
