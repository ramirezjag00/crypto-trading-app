import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/core'

import theme from '@constants/theme'
import { MarketStackRouteProp } from '@customtypes/navigation/market'
import SearchInput from './components/SearchInput'
import { CoinDefaultResponseType } from '@customtypes/coins/coin'
import SearchCoinsList from './components/SearchCoinsList'

const SearchScreen: React.FC = () => {
  const route = useRoute<MarketStackRouteProp<'SearchScreen'>>()
  const { coinListData, coinUnits } = route?.params
  const [value, setValue] = useState<string>('')
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const [coins, setCoins] = useState<CoinDefaultResponseType[]>([])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchInput value={value} setValue={setValue} />
      <SearchCoinsList
        activeUnit={activeUnit}
        coinListData={coinListData}
        coins={coins}
        coinUnits={coinUnits}
        setActiveUnit={setActiveUnit}
        setCoins={setCoins}
        value={value}
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

export default SearchScreen
