import { configureStore } from '@reduxjs/toolkit'

import { coinsApi } from './api/coinsApi'
import { coinUnitsApi } from './api/coinUnitsApi'
import { coinDetailsApi } from './api/coinDetails'

const store = configureStore({
  reducer: {
    [coinsApi?.reducerPath]: coinsApi?.reducer,
    [coinUnitsApi?.reducerPath]: coinUnitsApi?.reducer,
    [coinDetailsApi?.reducerPath]: coinDetailsApi?.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coinsApi?.middleware,
      coinUnitsApi?.middleware,
      coinDetailsApi?.middleware,
    ),
})

export default store
