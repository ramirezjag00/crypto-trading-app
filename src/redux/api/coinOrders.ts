import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { CoinOrderType } from '@customtypes/coins/coin'
import { RootState } from '@customtypes/store'

const coinOrdersAdapter = createEntityAdapter<CoinOrderType>({
  selectId: (coinOrder) => coinOrder?.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

const coinOrdersSlice = createSlice({
  name: 'coinOrders',
  initialState: coinOrdersAdapter.getInitialState(),
  reducers: {
    upsertCoinOrder: coinOrdersAdapter.upsertOne,
  },
})

const { upsertCoinOrder } = coinOrdersSlice.actions

const coinOrdersSelector = coinOrdersAdapter.getSelectors<RootState>(
  (state) => state.coinOrders,
)

const { selectAll: selectAllCoinOrders } = coinOrdersSelector

export { upsertCoinOrder, coinOrdersSelector, selectAllCoinOrders }

export default coinOrdersSlice?.reducer
