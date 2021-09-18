import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import theme from '@theme'
import { useFetchCoinsQuery } from '@store/api/coinsApi'
import { useFetchCoinUnitsQuery } from '@store/api/coinUnitsApi'
import CoinFilters from './components/CoinFilters'
import CoinsList from './components/CoinsList'

const CoinsScreen: React.FC = () => {
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const [activeCoinIdsIndex, setActiveCoinIdsIndex] = useState<number>(0)
  const { data: coinUnits } = useFetchCoinUnitsQuery()
  const { data: coinListData, isFetching: isFetchingCoinIds } =
    useFetchCoinsQuery()

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CoinFilters
        activeUnit={activeUnit}
        setActiveUnit={setActiveUnit}
        coinUnits={coinUnits}
      />
      <CoinsList
        activeUnit={activeUnit}
        coinListData={coinListData}
        isFetchingCoinIds={isFetchingCoinIds}
        activeCoinIdsIndex={activeCoinIdsIndex}
        setActiveCoinIdsIndex={setActiveCoinIdsIndex}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme?.colors?.dark,
  },
})

export default CoinsScreen
