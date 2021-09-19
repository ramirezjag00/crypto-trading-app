import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import {
  CoinDefaultChunkType,
  CoinDefaultResponseType,
} from '@customtypes/coins/coin'
import { metricSuffix } from '@utils/metricSuffix'
import theme from '@constants/theme'
import { useFetchCoinDetailsQuery } from '@store/api/coinDetails'
import { POLLING_INTERVAL } from '@constants/config'
import { coinListTitles } from '@constants/coins'

const SCREEN_WIDTH = Dimensions.get('screen')?.width

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
  const data = !activeCoinIdsIndex
    ? coinListPaginated?.[activeCoinIdsIndex]
    : coins
  const { data: coinDetailsData, refetch } = useFetchCoinDetailsQuery(
    {
      ids: data?.map((coin) => coin?.id)?.join(',') || '',
      unit: activeUnit,
    },
    {
      skip: isFetchingCoinIds && !coinListPaginated?.length,
      pollingInterval: POLLING_INTERVAL,
      refetchOnFocus: true,
    },
  )

  useEffect(() => {
    if (shouldFetchMore) {
      refetch()
    }
  }, [refetch, shouldFetchMore])

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

  const onPress = (item: CoinDefaultResponseType) => () =>
    console.log('item', item)

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    const coin24hVol = metricSuffix(
      coinDetailsData?.[item?.id]?.[`${activeUnit}_24h_vol`] || 0,
    )
    const coinPrice =
      coinDetailsData?.[item?.id]?.[activeUnit] || (0).toFixed(2)
    const coin24hChg = (
      coinDetailsData?.[item?.id]?.[`${activeUnit}_24h_change`] || 0
    )?.toFixed(2)
    const change24HStyles = StyleSheet.flatten([
      styles.coin24HChgCointainer,
      coin24hChg?.includes('-')
        ? styles.coin24HChgBearish
        : coin24hChg === '0.00'
        ? {}
        : styles.coin24HChgBullish,
    ])

    return (
      <TouchableOpacity style={styles.coinDetailsItem} onPress={onPress(item)}>
        <View>
          <Text style={styles.coinMain} numberOfLines={3}>
            {item?.symbol}
            <Text style={styles.coinMeta}>/{activeUnit}</Text>
          </Text>
          <Text style={styles.coinMeta}>
            Vol. {coin24hVol} {activeUnit}
          </Text>
        </View>
        <Text style={styles.coinPrice}>{coinPrice}</Text>
        <View style={change24HStyles}>
          <Text style={styles.coin24hChg}>{coin24hChg}%</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderCoinTitle = ({ item }: { item: string }) => (
    <Text style={styles.coinListTitle}>{item}</Text>
  )

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
  coinDetailsItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  coinMain: {
    width: SCREEN_WIDTH * 0.3,
    fontSize: 14,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
  coinPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
  coin24HChgCointainer: {
    backgroundColor: theme?.colors?.darkShadeLight40,
    padding: 10,
    borderRadius: 4,
  },
  coin24HChgBearish: {
    backgroundColor: theme?.colors?.bearishRed,
  },
  coin24HChgBullish: {
    backgroundColor: theme?.colors?.bullishGreen,
  },
  coin24hChg: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
  coinMeta: {
    fontWeight: 'normal',
    color: theme.colors?.darkShadeLight90,
    fontSize: 12,
  },
  coinListTitle: {
    fontSize: 12,
    color: theme?.colors?.darkShadeLight90,
  },
})

export default CoinsList
