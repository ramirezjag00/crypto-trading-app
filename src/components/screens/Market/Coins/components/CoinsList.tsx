import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/core'

import {
  CoinDefaultChunkType,
  CoinDefaultResponseType,
} from '@customtypes/coins/coin'
import theme from '@constants/theme'
import { useFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
import { coinListTitles } from '@constants/coins'
import LoadingCoins from '@common/LoadingCoins'
import CoinListItem from './CoinListItem'

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

  const renderCoinTitle = ({ item }: { item: string }) => (
    <Text style={styles.coinListTitle}>{item}</Text>
  )

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    return (
      <CoinListItem
        coinDetailsData={coinDetailsData}
        activeUnit={activeUnit}
        coin={item}
      />
    )
  }

  if (!data?.length) {
    return <LoadingCoins />
  }

  return (
    <Fragment>
      <FlatList
        data={coinListTitles}
        renderItem={renderCoinTitle}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        style={styles.coinTitlesContainer}
        contentContainerStyle={styles.coinTitlesContentContainer}
        scrollEnabled={false}
      />

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
  coinTitlesContainer: {
    flexGrow: 0,
  },
  coinDetailsContainer: {
    flex: 1,
  },
  coinTitlesContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  coinDetailsContentContainer: {
    marginHorizontal: 20,
  },
  coinListTitle: {
    fontSize: 12,
    color: theme?.colors?.darkShadeLight90,
  },
})

export default CoinsList
