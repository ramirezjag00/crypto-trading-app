interface CoinDefault {
  id: string
  symbol: string
  name: string
}

interface CoinUnits {
  btc: string
  alts: string[]
  fiat: string[]
}

export { CoinDefault, CoinUnits }
