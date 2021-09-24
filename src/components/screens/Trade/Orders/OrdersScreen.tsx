import React from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'

import theme from '@constants/theme'
import { useAppSelector } from '@utils/hooks/store'
import { selectAllCoinOrders } from '@store/api/coinOrders'

const OrdersScreen: React.FC = () => {
  const coinOrders = useAppSelector(selectAllCoinOrders)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={coinOrders}
        keyExtractor={(item) => item.id}
        style={styles.coinDetailsContainer}
        contentContainerStyle={styles.coinDetailsContentContainer}
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
  coinDetailsContainer: {
    flex: 1,
  },
  coinDetailsContentContainer: {
    marginHorizontal: 20,
  },
})

export default OrdersScreen
