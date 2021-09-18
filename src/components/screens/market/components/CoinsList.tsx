import React, { useEffect } from 'react'
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

const SCREEN_WIDTH = Dimensions.get('screen')?.width

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

  const onPress = (item: CoinDefaultResponseType) => () =>
    console.log('item', item)

  const renderCoinDetails = ({ item }: { item: CoinDefaultResponseType }) => {
    const coin24hVol = metricSuffix(
      coinDetails?.[item?.id]?.[`${activeUnit}_24h_vol`] || 0,
    )
    const coinPrice = coinDetails?.[item?.id]?.[activeUnit] || 0
    const coin24hChg = (
      coinDetails?.[item?.id]?.[`${activeUnit}_24h_change`] || 0
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

  const data: CoinDefaultResponseType[] = coinIds?.[activeCoinIdsIndex] ?? []

  return (
    <FlatList
      data={data}
      renderItem={renderCoinDetails}
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
})

export default CoinsList
