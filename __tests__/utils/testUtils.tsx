import React, { ReactElement } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { RenderAPI, render } from '@testing-library/react-native'

import StoreType from '../types/storeType'

const mockStore = configureStore()

const renderWithReduxProvider = (
  component: ReactElement | React.FC,
  { reduxMocks }: { reduxMocks?: StoreType },
): RenderAPI => {
  const store = mockStore(reduxMocks)
  return render(<ReduxProvider store={store}>{component}</ReduxProvider>)
}

export { renderWithReduxProvider }
