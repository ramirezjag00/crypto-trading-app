import { configureStore } from '@reduxjs/toolkit'

import { coinsApi } from './api/coinsApi'

const store = configureStore({
  reducer: {
    [coinsApi?.reducerPath]: coinsApi?.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coinsApi?.middleware),
})

export default store
