import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import theme from '@constants/theme'

const LoadingCoins: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme?.colors?.primary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default LoadingCoins
