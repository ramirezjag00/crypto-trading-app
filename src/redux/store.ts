import { configureStore } from '@reduxjs/toolkit'

import { coinsApi } from './api/coinsApi'
import { coinUnitsApi } from './api/coinUnitsApi'
import { coinDetailsApi } from './api/coinDetails'
import coinTradesReducer from './api/coinTrades'

const store = configureStore({
  reducer: {
    [coinsApi?.reducerPath]: coinsApi?.reducer,
    [coinUnitsApi?.reducerPath]: coinUnitsApi?.reducer,
    [coinDetailsApi?.reducerPath]: coinDetailsApi?.reducer,
    coinTrades: coinTradesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: [
          coinsApi?.reducerPath,
          coinUnitsApi?.reducerPath,
          coinDetailsApi?.reducerPath,
        ],
      },
      serializableCheck: {
        ignoredPaths: [
          coinsApi?.reducerPath,
          coinUnitsApi?.reducerPath,
          coinDetailsApi?.reducerPath,
        ],
      },
    }).concat(
      coinsApi?.middleware,
      coinUnitsApi?.middleware,
      coinDetailsApi?.middleware,
    ),
})

export default store
