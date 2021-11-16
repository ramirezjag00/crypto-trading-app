interface CoinDefaultResponseType {
  id: string
  symbol: string
  name: string
}

type CoinDefaultChunkType = Array<CoinDefaultResponseType[]>

interface CoinsResult {
  coinListData: CoinDefaultResponseType[]
  coinListPaginated: CoinDefaultChunkType
}

enum CoinFiltersType {
  BTC = 'btc',
  ALTS = 'alts',
  FIAT = 'fiat',
}

type CoinUnitsType =
  | {
      [CoinFiltersType?.BTC]: string
      [CoinFiltersType?.ALTS]: string[]
      [CoinFiltersType?.FIAT]: string[]
    }
  | undefined

interface CoinDetailsType {
  [key: string]: {
    [key: string]: number
  }
}

export {
  CoinDefaultResponseType,
  CoinDefaultChunkType,
  CoinUnitsType,
  CoinFiltersType,
  CoinDetailsType,
  CoinsResult,
}
