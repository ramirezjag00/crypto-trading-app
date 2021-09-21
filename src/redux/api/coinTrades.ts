import { createEntityAdapter } from '@reduxjs/toolkit'

import { CoinTradeType } from '@customtypes/coins/coin'

const coinTradesAdapter = createEntityAdapter<CoinTradeType>({
  selectId: (coinTrade) => coinTrade?.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})
