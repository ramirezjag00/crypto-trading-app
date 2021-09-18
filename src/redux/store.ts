import { configureStore } from '@reduxjs/toolkit'

import { coinsApi } from './api/coinsApi'
import { coinUnitsApi } from './api/coinUnitsApi'

const store = configureStore({
  reducer: {
    [coinsApi?.reducerPath]: coinsApi?.reducer,
    [coinUnitsApi?.reducerPath]: coinUnitsApi?.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      coinsApi?.middleware,
      coinUnitsApi?.middleware,
    ),
})

export default store
