import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import theme from '@constants/theme'
import { OrderedItemDetails } from '@customtypes/orders/order'

interface Props {
  data: OrderedItemDetails[]
}

const OrderItem: React.FC<Props> = (props) => {
  const { data } = props

  return (
    <FlatList
      data={data}
      keyExtractor={(orderItemDetail, index) =>
        `${orderItemDetail.label}-${index}`
      }
      style={styles.orderContainer}
      horizontal={false}
      scrollEnabled={false}
      scrollEventThrottle={16}
      removeClippedSubviews={true}
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
})

export default OrderItem
