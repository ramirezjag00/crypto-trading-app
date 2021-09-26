import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import 'react-native-gesture-handler'

import RootStack from '@routes/RootStack'
import store, { persistor } from '@store/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootStack />
      </PersistGate>
    </Provider>
  )
}

export default App
