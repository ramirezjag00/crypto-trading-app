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
  const [coins, setCoins] = useState<CoinDefaultResponseType[]>([])
  const [trigger, result] = useLazyFetchCoinDetailsQuery({
    pollingInterval: POLLING_INTERVAL,
    refetchOnFocus: true,
  })

  const onSearchCoins = useCallback(
    async (text: string): Promise<void> => {
      if (text) {
        const filteredCoins = await asyncFilter(
          coinListData,
          (coin: CoinDefaultResponseType) =>
            coin?.name?.toLowerCase()?.includes(text?.toLowerCase()) ||
            coin?.symbol?.toLowerCase()?.startsWith(text?.toLowerCase()),
        )
        const coinIds = filteredCoins?.map((item) => item?.id)?.join(',') || ''

        if (coinIds) {
          setCoins(filteredCoins)
          trigger({
            ids: coinIds,
            unit: activeUnit,
          })
        }
      }
    },
    [activeUnit, coinListData, trigger],
  )

  useEffect(() => {
    if (value) {
      onSearchCoins(value)
    } else {
      setCoins([])
    }
  }, [onSearchCoins, value])

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
