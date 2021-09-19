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

interface CoinDetailType {
  [key: string]: number
}
interface CoinDetailsType {
  [key: string]: CoinDetailType
}

export {
  CoinDefaultChunkType,
  CoinDefaultResponseType,
  CoinDetailsType,
  CoinDetailType,
  CoinFiltersType,
  CoinsResult,
  CoinUnitsType,
}
