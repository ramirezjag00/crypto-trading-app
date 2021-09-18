interface CoinDefault {
  id: string
  symbol: string
  name: string
}

enum CoinFilters {
  BTC = 'btc',
  ALTS = 'alts',
  FIAT = 'fiat',
}

type CoinUnits =
  | {
      [CoinFilters?.BTC]: string
      [CoinFilters?.ALTS]: string[]
      [CoinFilters?.FIAT]: string[]
    }
  | undefined

export { CoinDefault, CoinUnits, CoinFilters }
