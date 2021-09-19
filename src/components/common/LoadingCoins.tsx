import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

import theme from '@constants/theme'

const LoadingCoins: React.FC = () => {
  return (
    <ActivityIndicator
      color={theme?.colors?.primary}
      size="large"
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default LoadingCoins
