import { CoinFilters } from '@customtypes/coins/coin'

const mainFilters: ReadonlyArray<CoinFilters> = [
  CoinFilters?.BTC,
  CoinFilters?.ALTS,
  CoinFilters?.FIAT,
]

export { mainFilters }
