import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import theme from '@theme'
import { useFetchCoinsQuery } from '@store/api/coinsApi'
import { useFetchCoinUnitsQuery } from '@store/api/coinUnitsApi'
import CoinFilters from './components/CoinFilters'

const CoinsScreen: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const { data: coinIds = '' } = useFetchCoinsQuery()
  const { data: coinUnits } = useFetchCoinUnitsQuery()
  console.log('coinIds', coinIds)
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>List of cryptocurrencies here</Text>
      <CoinFilters
        activeUnit={activeUnit}
        setActiveUnit={setActiveUnit}
        coinUnits={coinUnits}
      />
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
