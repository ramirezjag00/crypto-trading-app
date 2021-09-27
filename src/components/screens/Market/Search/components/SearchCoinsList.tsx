import React, { Fragment, useCallback, useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { POLLING_INTERVAL } from '@constants/config'
import { useLazyFetchCoinDetailsQuery } from '@store/api/coinDetails'
import CoinListTitles from '@screens/Market/Coins/components/CoinListTitles'
import CoinFilters from '@screens/Market/Coins/components/CoinFilters'
import {
  CoinTradeType,
  CoinDefaultResponseType,
  CoinUnitsType,
} from '@customtypes/coins/coin'
import asyncFilter from '@utils/asyncFilter'
import CoinListItem from '@common/CoinListItem'
import Empty from '@common/Empty'
import ActivityIndicator from '@common/ActivityIndicator'
import { useIsFocused } from '@react-navigation/core'

interface Props {
  activeUnit: string
  coinListData: CoinDefaultResponseType[]
  coins: CoinDefaultResponseType[]
  coinUnits: CoinUnitsType
  setActiveUnit: React.Dispatch<React.SetStateAction<string>>
  setCoins: React.Dispatch<React.SetStateAction<CoinDefaultResponseType[]>>
  value: string
  onShowModal: (item: CoinTradeType) => void
  isModalVisible: boolean
}

const SearchCoinsList: React.FC<Props> = (props) => {
  const {
    activeUnit,
    coinListData,
    coins,
    coinUnits,
    setActiveUnit,
    setCoins,
    value,
    onShowModal,
    isModalVisible = false,
  } = props
  const isFocused = useIsFocused()
  const [trigger, result] = useLazyFetchCoinDetailsQuery({
    pollingInterval: isFocused && !isModalVisible ? POLLING_INTERVAL : 0,
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

        setCoins(filteredCoins)
        trigger({
          ids: coinIds,
          unit: activeUnit,
        })
      }
    },
    [activeUnit, coinListData, setCoins, trigger],
  )

  useEffect(() => {
    if (value) {
      onSearchCoins(value)
    } else {
      setCoins([])
      setActiveUnit('btc')
    }
  }, [onSearchCoins, setActiveUnit, setCoins, value])

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    return (
      <CoinListItem
        coinDetails={(result?.data || {})?.[item?.id]}
        activeUnit={activeUnit}
        coin={item}
        onShowModal={onShowModal}
      />
    )
  }

  return (
    <Fragment>
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
            scrollEventThrottle={16}
          />
        </Fragment>
      ) : result?.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Empty label="Start hodling! Search by name or symbol" />
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  coinDetailsContainer: {
    flex: 1,
  },
  coinDetailsContentContainer: {
    marginHorizontal: 20,
  },
})

export default SearchCoinsList
