import React from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import { useAppSelector } from '@utils/hooks/store'
import { selectAllCoinTrades } from '@store/api/coinTrades'
import { CoinTradeType } from '@customtypes/coins/coin'
import theme from '@constants/theme'

const TradesScreen: React.FC = () => {
  const coinTrades = useAppSelector(selectAllCoinTrades)

  const onPressPurchase = (coinTrade: CoinTradeType): void => {
    console.log('coinTrade', coinTrade)
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={coinTrades}
        extraData={coinTrades}
        keyExtractor={(item) => item?.id}
        horizontal={false}
        scrollEnabled
        scrollEventThrottle={16}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: theme?.colors?.dark,
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
  },
})

export default TradesScreen
