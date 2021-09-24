import React from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet } from 'react-native'

import { useAppDispatch, useAppSelector } from '@utils/hooks/store'
import { removeCoinTrade, selectAllCoinTrades } from '@store/api/coinTrades'
import { CoinOrderType, CoinTradeType } from '@customtypes/coins/coin'
import TradeCard from '@common/TradeCard'
import theme from '@constants/theme'
import Empty from '@common/Empty'
import { upsertCoinOrder } from '@store/api/coinOrders'

const TradesScreen: React.FC = () => {
  const coinTrades = useAppSelector(selectAllCoinTrades)
  const dispatch = useAppDispatch()

  const onPurchasePrompt = (coinOrder: CoinOrderType): void => {
    Alert.alert(
      'Are you sure?',
      `Tap on checkout to purchase ${
        coinOrder?.amount as number
      } ${coinOrder?.symbol.toUpperCase()}s @ ${coinOrder?.price as number}${
        coinOrder?.unit
      }`,
      [
        {
          text: 'Checkout',
          onPress: (): void => {
            dispatch(upsertCoinOrder(coinOrder))
            dispatch(removeCoinTrade(coinOrder?.id))
          },
        },
        { text: 'Cancel' },
      ],
    )
  }

  const onPressPurchase = (coinOrder: CoinOrderType): void => {
    onPurchasePrompt(coinOrder)
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
    marginVertical: 10,
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
