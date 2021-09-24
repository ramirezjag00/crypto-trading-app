import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { coinsApi } from './api/coinsApi'
import { coinUnitsApi } from './api/coinUnitsApi'
import { coinDetailsApi } from './api/coinDetails'
import coinTradesReducer from './api/coinTrades'
import coinOrdersReducer from './api/coinOrders'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    coinsApi?.reducerPath,
    coinUnitsApi?.reducerPath,
    coinDetailsApi?.reducerPath,
  ],
}

const rootReducer = combineReducers({
  [coinsApi?.reducerPath]: coinsApi?.reducer,
  [coinUnitsApi?.reducerPath]: coinUnitsApi?.reducer,
  [coinDetailsApi?.reducerPath]: coinDetailsApi?.reducer,
  coinTrades: coinTradesReducer,
  coinOrders: coinOrdersReducer,
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
      serializableCheck: __DEV__
        ? false
        : {
            ignoredPaths: [
              coinsApi?.reducerPath,
              coinUnitsApi?.reducerPath,
              coinDetailsApi?.reducerPath,
            ],
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    }).concat(
      coinsApi?.middleware,
      coinUnitsApi?.middleware,
      coinDetailsApi?.middleware,
    ),
})

const persistor = persistStore(store)

export { store as default, persistor }
