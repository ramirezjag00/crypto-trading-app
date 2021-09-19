import React from 'react'
import { ActivityIndicator } from 'react-native'

import theme from '@constants/theme'

const LoadingCoins: React.FC = () => {
  return <ActivityIndicator color={theme?.colors?.primary} size="large" />
}

export default LoadingCoins
