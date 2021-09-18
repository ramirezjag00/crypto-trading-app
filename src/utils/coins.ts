import { mainFilters } from '@constants/coinFilters'
import { CoinFilters } from '@customtypes/coins/coin'

const isCoinFilter = (filter: CoinFilters | string): boolean =>
  mainFilters?.includes(filter as CoinFilters)

export { isCoinFilter }
