import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/core'

import {
  CoinDefaultChunkType,
  CoinDefaultResponseType,
  CoinTradeType,
} from '@customtypes/coins/coin'
import { useFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
import CoinListItem from '../../../../common/CoinListItem'
import CoinListTitles from './CoinListTitles'
import ActivityIndicator from '@common/ActivityIndicator'

interface Props {
  activeUnit: string
  coinListPaginated?: CoinDefaultChunkType
  isFetchingCoinIds: boolean
  activeCoinIdsIndex: number
  setActiveCoinIdsIndex: React.Dispatch<React.SetStateAction<number>>
  onShowModal: (item: CoinTradeType) => void
  isModalVisible: boolean
}

const CoinsList: React.FC<Props> = (props) => {
  const {
    activeUnit,
    coinListPaginated = [],
    isFetchingCoinIds,
    activeCoinIdsIndex,
    setActiveCoinIdsIndex,
    onShowModal,
    isModalVisible = false,
  } = props
  const [coins, setCoins] = useState<CoinDefaultResponseType[]>([])
  const isFocused = useIsFocused()
  const { data: coinDetailsData } = useFetchCoinDetailsQuery(
    {
      ids: coins?.map((coin) => coin?.id)?.join(',') || '',
      unit: activeUnit,
    },
    {
      skip: isFetchingCoinIds && !coinListPaginated?.length && isModalVisible,
      pollingInterval: isFocused && !isModalVisible ? POLLING_INTERVAL : 0,
      refetchOnFocus: true,
    },
  )

  useEffect(() => {
    if (!coins?.length && coinListPaginated?.length && !activeCoinIdsIndex) {
      setCoins(coinListPaginated?.[activeCoinIdsIndex])
    }
  }, [activeCoinIdsIndex, coinListPaginated, coins?.length])

  const fetchMoreCoinDetails = useCallback(() => {
    const newActiveCoinIdsIndex = activeCoinIdsIndex + 1
    setCoins([...coins, ...coinListPaginated[newActiveCoinIdsIndex]])
    setActiveCoinIdsIndex(newActiveCoinIdsIndex)
  }, [activeCoinIdsIndex, coinListPaginated, coins, setActiveCoinIdsIndex])

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    return (
      <CoinListItem
        coinDetails={coinDetailsData?.[item?.id]}
        activeUnit={activeUnit}
        coin={item}
        onShowModal={onShowModal}
      />
    )
  }

  if (!coins?.length) {
    return <ActivityIndicator />
  }

  return (
    <Fragment>
      <CoinListTitles />
      <FlatList
        data={coins}
        initialNumToRender={50}
        key={activeCoinIdsIndex}
        renderItem={renderCoinDetails}
        keyExtractor={(item) => item.id}
        style={styles.coinDetailsContainer}
        contentContainerStyle={styles.coinDetailsContentContainer}
        horizontal={false}
        scrollEnabled
        onEndReachedThreshold={0.9}
        onEndReached={fetchMoreCoinDetails}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
      />
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

export default CoinsList
