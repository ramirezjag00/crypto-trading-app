import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import theme from '@constants/theme'

const OrdersScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text>Hello World</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: theme?.colors?.dark,
    flex: 1,
  },
})

export default OrdersScreen
