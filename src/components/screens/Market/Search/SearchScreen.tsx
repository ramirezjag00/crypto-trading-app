import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/core'

import theme from '@constants/theme'
import { MarketStackRouteProp } from '@customtypes/navigation/market'
import SearchInput from './components/SearchInput'
import asyncFilter from '@utils/asyncFilter'
import { CoinDefaultResponseType } from '@customtypes/coins/coin'
import { useLazyFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
import CoinListTitles from '../Coins/components/CoinListTitles'
import LoadingCoins from '@common/LoadingCoins'
import CoinListItem from '../Coins/components/CoinListItem'
import CoinFilters from '../Coins/components/CoinFilters'

const SearchScreen: React.FC = () => {
  const route = useRoute<MarketStackRouteProp<'SearchScreen'>>()
  const { coinListData, coinUnits } = route?.params
  const [value, setValue] = useState<string>('')
  const [activeUnit, setActiveUnit] = useState<string>('btc')

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    return (
      <CoinListItem
        coinDetailsData={result?.data || {}}
        activeUnit={activeUnit}
        coin={item}
      />
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchInput value={value} setValue={setValue} />
      {!!coins?.length && !!result?.data ? (
        <Fragment>
          <CoinFilters
            activeUnit={activeUnit}
            setActiveUnit={setActiveUnit}
            coinUnits={coinUnits}
          />
          <CoinListTitles />
          <FlatList
            data={coins}
            extraData={result?.data}
            renderItem={renderCoinDetails}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            style={styles.coinDetailsContainer}
            contentContainerStyle={styles.coinDetailsContentContainer}
            horizontal={false}
            scrollEnabled
          />
        </Fragment>
      ) : (
        <LoadingCoins />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme?.colors?.dark,
  },
  coinDetailsContainer: {
    flex: 1,
  },
  coinDetailsContentContainer: {
    marginHorizontal: 20,
  },
})

export default SearchScreen
