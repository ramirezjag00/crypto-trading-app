import React, { ReactElement } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'

import { useAppSelector } from '@utils/hooks/store'
import { selectAllCoinTrades } from '@store/api/coinTrades'
import { CoinTradeType } from '@customtypes/coins/coin'
import TradeCard from '@common/TradeCard'
import theme from '@constants/theme'
import Empty from '@common/Empty'

const TradesScreen: React.FC = () => {
  const coinTrades = useAppSelector(selectAllCoinTrades)

  const onPressPurchase = (coinTrade: CoinTradeType): void => {
    console.log('coinTrade', coinTrade)
  }

  const renderItem = ({ item }: { item: CoinTradeType }) => {
    return (
      <TradeCard
        buttonLabel="Purchase"
        onPressButton={onPressPurchase}
        activeCoin={item}
        containerStyle={styles.tradeCard}
      />
    )
  }

  const renderHeader = (): ReactElement => {
    return <Text style={styles.title}>TRADES</Text>
  }

  if (!coinTrades?.length) {
    return <Empty label="Now is the best time to buy" isVisibleSearch />
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={coinTrades}
        extraData={coinTrades}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        horizontal={false}
        scrollEnabled
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        ListHeaderComponent={renderHeader}
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
  tradeCard: {
    backgroundColor: theme?.colors?.troutOpacity30,
    borderRadius: 5,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    color: theme?.colors?.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyLabel: {
    color: theme?.colors?.white,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})

export default TradesScreen
