import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

import { CoinTradeType } from '@customtypes/coins/coin'
import { RootState } from '@customtypes/store'

const coinTradesAdapter = createEntityAdapter<CoinTradeType>({
  selectId: (coinTrade) => coinTrade?.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const coinTradeSlice = createSlice({
  name: 'coinTrades',
  initialState: coinTradesAdapter.getInitialState(),
  reducers: {
    upsertCoinTrade: coinTradesAdapter.upsertOne,
    removeCoinTrade: (state, action: PayloadAction<string>) => {
      coinTradesAdapter.removeOne(state, action.payload)
    },
  },
})

const { upsertCoinTrade, removeCoinTrade } = coinTradeSlice.actions

const coinTradesSelector = coinTradesAdapter.getSelectors<RootState>(
  (state) => state.coinTrades,
)

const {
  selectIds: selectCoinTradeIds,
  selectEntities: selectCoinTradeEntities,
  selectAll: selectAllCoinTrades,
} = coinTradesSelector

export {
  upsertCoinTrade,
  removeCoinTrade,
  coinTradesSelector,
  selectCoinTradeIds,
  selectCoinTradeEntities,
  selectAllCoinTrades,
}

export default coinTradeSlice?.reducer
