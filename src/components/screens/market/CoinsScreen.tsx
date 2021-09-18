import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import theme from '@theme'
import { useFetchCoinsQuery } from '@store/api/coinsApi'
import { useFetchCoinUnitsQuery } from '@store/api/coinUnitsApi'

const CoinsScreen: React.FC = () => {
  const { data: coinIds = '' } = useFetchCoinsQuery()
  const { data: coinUnits = '' } = useFetchCoinUnitsQuery()
  console.log(coinIds)
  console.log(coinUnits)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>List of cryptocurrencies here</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme?.colors?.dark,
  },
  title: {
    color: theme?.colors?.white,
    fontSize: 24,
    textAlign: 'center',
  },
})

export default CoinsScreen
