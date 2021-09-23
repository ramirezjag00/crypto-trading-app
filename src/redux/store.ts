import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { coinsApi } from './api/coinsApi'
import { coinUnitsApi } from './api/coinUnitsApi'
import { coinDetailsApi } from './api/coinDetails'
import coinTradesReducer from './api/coinTrades'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  [coinsApi?.reducerPath]: coinsApi?.reducer,
  [coinUnitsApi?.reducerPath]: coinUnitsApi?.reducer,
  [coinDetailsApi?.reducerPath]: coinDetailsApi?.reducer,
  coinTrades: coinTradesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
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

const persistor = persistStore(store)

export { store as default, persistor }
