import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '@constants/theme'
import Button from './Button'

interface Props {
  onPress: (isIncreasing: boolean) => () => void
  quantity: number
}

const QuantityController: React.FC<Props> = (props) => {
  const { onPress, quantity } = props
  return (
    <View style={styles.controller}>
      <Button
        buttonStyles={styles.quantityController}
        label="-"
        onPress={onPress(false)}
        textStyles={styles.controllerLabel}
        disabled={!quantity}
      />
      <Text style={styles.quantity}>{quantity}</Text>
      <Button
        buttonStyles={styles.quantityController}
        label="+"
        onPress={onPress(true)}
        textStyles={styles.controllerLabel}
      />
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
