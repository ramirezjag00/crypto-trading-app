import React, { memo } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { metricSuffix } from '@utils/metricSuffix'
import {
  CoinAddTradeModalType,
  CoinDefaultResponseType,
  CoinDetailType,
} from '@customtypes/coins/coin'
import theme from '@constants/theme'

interface Props {
  coinDetails?: CoinDetailType
  activeUnit: string
  coin: CoinDefaultResponseType
  onShowModal: (item: CoinAddTradeModalType) => void
}
const SCREEN_WIDTH = Dimensions.get('screen')?.width

const CoinListItem: React.FC<Props> = (props) => {
  const { coinDetails, activeUnit, coin, onShowModal } = props
  const coin24hVol = metricSuffix(coinDetails?.[`${activeUnit}_24h_vol`] || 0)
  const coinPrice = coinDetails?.[activeUnit] || (0).toFixed(2)
  const coin24hChg = (coinDetails?.[`${activeUnit}_24h_change`] || 0)?.toFixed(
    2,
  )
  const change24HStyles = StyleSheet.flatten([
    styles.coin24HChgCointainer,
    coin24hChg?.includes('-')
      ? styles.coin24HChgBearish
      : coin24hChg === '0.00'
      ? {}
      : styles.coin24HChgBullish,
  ])

  const onPress = (): void => {
    if (!!coinDetails && !!coin) {
      onShowModal({
        ...coin,
        unit: activeUnit,
      })
    }
  }

  return (
    <TouchableOpacity style={styles.coinDetailsItem} onPress={onPress}>
      <View>
        <Text style={styles.coinMain} numberOfLines={3}>
          {coin?.symbol}
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

const styles = StyleSheet.create({
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

export default memo(CoinListItem)
