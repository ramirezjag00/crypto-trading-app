import { CoinFiltersType } from '@customtypes/coins/coin'

const mainFilters: ReadonlyArray<CoinFiltersType> = [
  CoinFiltersType?.BTC,
  CoinFiltersType?.ALTS,
  CoinFiltersType?.FIAT,
]

const coinListTitles: ReadonlyArray<string> = [
  'Name / Vol',
  'Price',
  '24h Chg %',
]

const addCoinToTradeTitles: ReadonlyArray<string> = [
  'Market Price',
  'Amount',
  'Total',
]

export { mainFilters, coinListTitles, addCoinToTradeTitles }
