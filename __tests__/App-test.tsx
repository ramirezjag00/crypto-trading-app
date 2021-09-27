import 'whatwg-fetch'
import 'react-native'
import React from 'react'
import { cleanup } from '@testing-library/react-native'

import App from '../App'
import { renderWithReduxProvider } from './utils/testUtils'
import { IS_FRESH_INSTALL_REDUCER_MOCK } from './constants/store'

jest.useFakeTimers()

afterEach(cleanup)

it('renders correctly', () => {
  renderWithReduxProvider(<App />, {
    reduxMocks: {
      ...IS_FRESH_INSTALL_REDUCER_MOCK,
    },
  })
})
