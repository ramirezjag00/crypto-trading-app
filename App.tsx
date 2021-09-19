import React from 'react'
import { Provider } from 'react-redux'

import RootStack from '@routes/RootStack'
import store from '@store/store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  )
}

export default App
