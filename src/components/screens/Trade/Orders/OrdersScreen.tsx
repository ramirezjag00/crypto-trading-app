import React from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import theme from '@constants/theme'
import { useAppSelector } from '@utils/hooks/store'
import { selectAllCoinOrders } from '@store/api/coinOrders'
import { CoinOrderType } from '@customtypes/coins/coin'
import { fullDateTime } from '@utils/dataTime'
import Empty from '@common/Empty'
import OrderItem from './components/OrderItem'
import { OrderedItemDetails } from '@customtypes/orders/order'

const OrdersScreen: React.FC = () => {
  const coinOrders = useAppSelector(selectAllCoinOrders)

  const renderItem = ({ item }: { item: CoinOrderType }) => {
    const orderedItemDetails: OrderedItemDetails[] = [
      {
        label: `${item?.symbol?.toUpperCase()} / ${item?.unit?.toUpperCase()}`,
        value: fullDateTime(item?.orderedDate as number),
      },
      {
        label: `Price (${item?.unit?.toUpperCase()})`,
        value: item?.price,
      },
      {
        label: `Filled (${item?.symbol?.toUpperCase()})`,
        value: item?.amount,
      },
      {
        label: `Total (${item?.unit?.toUpperCase()})`,
        value: item?.total,
      },
    ]

    return <OrderItem data={orderedItemDetails} />
  }

  if (!coinOrders?.length) {
    return (
      <Empty
        label="No orders yet, search or browse from the list"
        isVisibleSearch
      />
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={coinOrders}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        style={styles.coinOrdersContainer}
        contentContainerStyle={styles.coinOrdersContentContainer}
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
  coinOrdersContainer: {
    flex: 1,
  },
  coinOrdersContentContainer: {
    marginHorizontal: 20,
  },
})

export default OrdersScreen
