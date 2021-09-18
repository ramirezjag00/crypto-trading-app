import React, { useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'

import theme from '@theme'
import { useFetchCoinsQuery } from '@store/api/coinsApi'
import { useFetchCoinUnitsQuery } from '@store/api/coinUnitsApi'
import { mainFilters } from '@constants/coinFilters'
import { CoinFilters } from '@customtypes/coins/coin'

const CoinsScreen: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const [activeMainFilter, setActiveMainFilter] = useState<CoinFilters>(
    CoinFilters?.BTC,
  )
  const { data: coinIds = '' } = useFetchCoinsQuery()
  const { data: coinUnits } = useFetchCoinUnitsQuery()

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>List of cryptocurrencies here</Text>
      <FlatList
        data={mainFilters}
        renderItem={renderFilterItem}
        keyExtractor={(item: string) => item}
        style={styles.filtersContainer}
        contentContainerStyle={styles.mainFiltersContentContainer}
        scrollEnabled={false}
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
  filtersContainer: {
    flexGrow: 0,
  },
  mainFiltersContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
})

export default CoinsScreen
