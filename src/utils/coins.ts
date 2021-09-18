import { mainFilters } from '@constants/coins'
import { CoinFiltersType } from '@customtypes/coins/coin'

const isCoinFilter = (filter: CoinFiltersType | string): boolean =>
  mainFilters?.includes(filter as CoinFiltersType)

export { isCoinFilter }
