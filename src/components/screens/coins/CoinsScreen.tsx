import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

const CoinsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>List of cryptocurrencies here</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
})

export default CoinsScreen
