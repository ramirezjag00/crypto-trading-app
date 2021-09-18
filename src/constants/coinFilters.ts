import { CoinFiltersType } from '@customtypes/coins/coin'

const mainFilters: ReadonlyArray<CoinFiltersType> = [
  CoinFiltersType?.BTC,
  CoinFiltersType?.ALTS,
  CoinFiltersType?.FIAT,
]

export { mainFilters }
