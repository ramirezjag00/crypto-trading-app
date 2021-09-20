import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import theme from '@constants/theme'

interface Props {
  onPress: (isIncreasing: boolean) => () => void
  quantity: number
}

const QuantityController: React.FC<Props> = (props) => {
  const { onPress, quantity } = props
  return (
    <View style={styles.controller}>
      <TouchableOpacity
        onPress={onPress(false)}
        style={styles.quantityController}>
        <Text style={styles.controllerLabel}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity
        onPress={onPress(true)}
        style={styles.quantityController}>
        <Text style={styles.controllerLabel}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  controller: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  quantityController: {
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme?.colors?.primary,
    borderRadius: 5,
  },
  controllerLabel: {
    color: theme?.colors?.white,
    fontSize: 18,
  },
  quantity: {
    color: theme?.colors?.white,
    fontSize: 20,
    paddingHorizontal: 20,
  },
})

export default QuantityController
