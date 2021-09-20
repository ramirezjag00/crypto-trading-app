import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/core'

import {
  CoinDefaultChunkType,
  CoinDefaultResponseType,
} from '@customtypes/coins/coin'
import { useFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
import CoinListItem from './CoinListItem'
import CoinListTitles from './CoinListTitles'
import ActivityIndicator from '@common/ActivityIndicator'

interface Props {
  activeUnit: string
  coinListPaginated?: CoinDefaultChunkType
  isFetchingCoinIds: boolean
  activeCoinIdsIndex: number
  setActiveCoinIdsIndex: React.Dispatch<React.SetStateAction<number>>
}

const CoinsList: React.FC<Props> = (props) => {
  const {
    activeUnit,
    coinListPaginated = [],
    isFetchingCoinIds,
    activeCoinIdsIndex,
    setActiveCoinIdsIndex,
  } = props
  const [coins, setCoins] = useState<CoinDefaultResponseType[]>([])
  const [shouldFetchMore, setShouldFetchMore] = useState(true)
  const isFocused = useIsFocused()
  const data = !activeCoinIdsIndex
    ? coinListPaginated?.[activeCoinIdsIndex]
    : coins
  const { data: coinDetailsData, refetch } = useFetchCoinDetailsQuery(
    {
      ids: data?.map((coin) => coin?.id)?.join(',') || '',
      unit: activeUnit,
    },
    {
      skip: !isFocused && isFetchingCoinIds && !coinListPaginated?.length,
      pollingInterval: POLLING_INTERVAL,
      refetchOnFocus: true,
    },
  )

  useEffect(() => {
    if (shouldFetchMore && isFocused) {
      refetch()
    }
  }, [isFocused, refetch, shouldFetchMore])

  const fetchMoreCoinDetails = useCallback(() => {
    setShouldFetchMore(false)
    const newActiveCoinIdsIndex = activeCoinIdsIndex + 1
    const arrayIndices = [...Array(newActiveCoinIdsIndex).keys()]
    const newCoinDetails: CoinDefaultResponseType[] = []
    arrayIndices?.forEach((i) => {
      newCoinDetails?.push(...coinListPaginated[i])
    })
    setActiveCoinIdsIndex(newActiveCoinIdsIndex)
    setCoins(newCoinDetails)
    setShouldFetchMore(true)
    refetch()
  }, [
    activeCoinIdsIndex,
    coinListPaginated,
    refetch,
    setActiveCoinIdsIndex,
    setCoins,
  ])

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    return (
      <CoinListItem
        coinDetails={coinDetailsData?.[item?.id]}
        activeUnit={activeUnit}
        coin={item}
      />
    )
  }

  if (!data?.length) {
    return <ActivityIndicator />
  }

  return (
    <Fragment>
      <CoinListTitles />
      <FlatList
        data={data}
        key={activeCoinIdsIndex}
        renderItem={renderCoinDetails}
        keyExtractor={(item) => item.id}
        style={styles.coinDetailsContainer}
        contentContainerStyle={styles.coinDetailsContentContainer}
        horizontal={false}
        scrollEnabled
        onEndReachedThreshold={0.9}
        onEndReached={fetchMoreCoinDetails}
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
