import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { enableScreens } from 'react-native-screens'

import RootStack from '@routes/RootStack'
import store, { persistor } from '@store/store'

if (!process.env.JEST_WORKER_ID) {
  enableScreens()
}

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
