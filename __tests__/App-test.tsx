import 'whatwg-fetch'
import 'react-native'
import React from 'react'
import { cleanup } from '@testing-library/react-native'
import renderer from 'react-test-renderer'

import App from '../App'

jest.useFakeTimers()

afterEach(cleanup)

it('renders correctly', () => {
  renderer.create(<App />)
})
