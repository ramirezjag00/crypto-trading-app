import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import theme from '@constants/theme'
import { OrderedItemDetails } from '@customtypes/orders/order'

interface Props {
  data: OrderedItemDetails[]
  orderId: string
}

const OrderItem: React.FC<Props> = (props) => {
  const { data, orderId } = props

  const renderItem = ({ item }: { item: OrderedItemDetails }) => (
    <View style={styles.orderTitleRow}>
      <Text style={styles.orderLabel} numberOfLines={4}>
        {item?.label}
      </Text>
      <Text style={styles.orderInfo}>{item?.value}</Text>
    </View>
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(_, index) => `${orderId}-${index}`}
      style={styles.orderContainer}
      horizontal={false}
      scrollEnabled={false}
      scrollEventThrottle={16}
    />
  )
}

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: theme?.colors?.troutOpacity30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 10,
  },
  orderTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: theme?.colors?.darkShadeLight20,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingVertical: 3,
  },
  orderLabel: {
    color: theme?.colors?.white,
    fontSize: 16,
    width: '50%',
  },
  orderInfo: {
    color: theme?.colors?.white,
    fontSize: 14,
  },
})

export default OrderItem
