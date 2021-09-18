import React, { useEffect } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import {
  CoinDefaultChunkType,
  CoinDefaultResponseType,
} from '@customtypes/coins/coin'
import { useFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'

interface Props {
  activeUnit: string
  coinIds?: CoinDefaultChunkType
  isFetchingCoinIds: boolean
  activeCoinIdsIndex: number
}

const CoinsList: React.FC<Props> = (props) => {
  const {
    activeUnit,
    coinIds = [],
    isFetchingCoinIds,
    activeCoinIdsIndex,
  } = props
  const {
    data: coinDetails,
    refetch,
    // error,
  } = useFetchCoinDetailsQuery(
    {
      ids:
        coinIds?.[activeCoinIdsIndex]?.map((coin) => coin?.id).join(',') || '',
      unit: activeUnit,
    },
    {
      skip: isFetchingCoinIds && !coinIds?.length,
      pollingInterval: POLLING_INTERVAL,
      refetchOnFocus: true,
    },
  )
  console.log('coinDetails', coinDetails)
  // console.log('error', error)

  useEffect(() => {
    refetch()
  }, [refetch])

  const data: CoinDefaultResponseType[] = coinIds?.[activeCoinIdsIndex] ?? []

  return (
    <FlatList
      data={data}
      // renderItem={renderCoinDetails}
      keyExtractor={(item) => item.id}
      style={styles.coinDetailsContainer}
      contentContainerStyle={styles.coinDetailsContentContainer}
      horizontal={false}
      scrollEnabled
    />
  )
}

const styles = StyleSheet.create({
  coinDetailsContainer: {
    flex: 1,
  },
  coinDetailsContentContainer: {
    paddingTop: 20,
    marginHorizontal: 20,
  },
})

export default CoinsList
