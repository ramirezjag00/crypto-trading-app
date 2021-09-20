import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

import theme from '@constants/theme'
import Button from './Button'

interface Props {
  onPress: (isIncreasing: boolean) => () => void
  quantity: number
  isQuantityVisible?: boolean
  controllerStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const QuantityController: React.FC<Props> = (props) => {
  const {
    onPress,
    quantity,
    isQuantityVisible = true,
    containerStyle,
    controllerStyle,
    textStyle,
  } = props
  const containerStyles = StyleSheet.flatten([
    styles.container,
    !isQuantityVisible && containerStyle,
  ])
  const quantityStyles = StyleSheet.flatten([
    styles.quantityController,
    !isQuantityVisible && controllerStyle,
  ])
  const textStyles = StyleSheet.flatten([
    styles.controllerLabel,
    !isQuantityVisible && textStyle,
  ])

  return (
    <View style={containerStyles}>
      <Button
        buttonStyles={quantityStyles}
        label="-"
        onPress={onPress(false)}
        textStyles={textStyles}
        disabled={!quantity}
      />
      {isQuantityVisible && <Text style={styles.quantity}>{quantity}</Text>}
      <Button
        buttonStyles={quantityStyles}
        label="+"
        onPress={onPress(true)}
        textStyles={textStyles}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
