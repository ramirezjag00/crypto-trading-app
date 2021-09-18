import React, { useState } from 'react'
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import theme from '@theme'
import { useFetchCoinsQuery } from '@store/api/coinsApi'
import { useFetchCoinUnitsQuery } from '@store/api/coinUnitsApi'
import { mainFilters } from '@constants/coinFilters'
import { CoinFilters } from '@customtypes/coins/coin'
import { isCoinFilter } from '@utils/coins'

const SCREEN_WIDTH = Dimensions.get('screen')?.width

const CoinsScreen: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const [activeMainFilter, setActiveMainFilter] = useState<CoinFilters>(
    CoinFilters?.BTC,
  )
  const { data: coinIds = '' } = useFetchCoinsQuery()
  const { data: coinUnits } = useFetchCoinUnitsQuery()

  const onFilterPress = (filter: CoinFilters | string) => () => {
    if (!isCoinFilter(filter) || filter === CoinFilters?.BTC) {
      setActiveUnit(filter)
    }

    if (isCoinFilter(filter)) {
      setActiveMainFilter(filter as CoinFilters)
    }
  }

  const renderFilterItem = ({ item }: { item: CoinFilters | string }) => {
    const buttonStyles = StyleSheet.flatten([
      styles.filterContainer,
      item === activeMainFilter ? styles.activeMainFilter : {},
    ])

    return (
      <TouchableOpacity style={buttonStyles} onPress={onFilterPress(item)}>
        <Text style={styles.filterLabel}>{item}</Text>
      </TouchableOpacity>
    )
  }

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
  filterContainer: {
    padding: SCREEN_WIDTH * 0.05,
    paddingVertical: 10,
    marginTop: 15,
  },
  activeMainFilter: {
    borderBottomColor: theme?.colors?.primary,
    borderBottomWidth: 2,
  },
  activeFilterContainer: {
    backgroundColor: theme?.colors?.primary,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
})

export default CoinsScreen
