import React from 'react'
import { StyleSheet, Text } from 'react-native'

import theme from '@constants/theme'
import Modal from './Modal'
import QuantityController from './QuantityController'
import { CoinAddTradeModalType } from '@customtypes/coins/coin'
import Button from './Button'

interface Props {
  isModalVisible: boolean
  onCloseModal: () => void
  activeCoin: CoinAddTradeModalType | null
  activeCoinQuantity: number
  onAmountChange: (isIncreasing: boolean) => () => void
}

const AddToTradeModal: React.FC<Props> = (props) => {
  const {
    activeCoin,
    activeCoinQuantity,
    isModalVisible,
    onAmountChange,
    onCloseModal,
  } = props

  const onPressAddToTrades = (): null => null

  return (
    <Modal
      isVisible={isModalVisible}
      onCloseModal={onCloseModal}
      hasContainer
      containerStyle={styles.modalContainer}>
      <Text style={styles.coinName} numberOfLines={2}>
        {activeCoin?.name}
      </Text>
      <Text style={styles.coinSymbol}>
        {activeCoin?.symbol} / {activeCoin?.unit}
      </Text>
      <QuantityController
        onPress={onAmountChange}
        quantity={activeCoinQuantity}
        isQuantityVisible={false}
        containerStyle={styles.controllerContainer}
        controllerStyle={styles.controller}
      />
      <Button
        label="Add to Trades"
        buttonStyles={styles.tradesContainer}
        textStyles={styles.tradesLabel}
        onPress={onPressAddToTrades}
        disabled={!activeCoinQuantity}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    zIndex: 1,
  },
  coinName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textDecorationColor: theme?.colors?.primary,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  coinSymbol: {
    fontSize: 12,
    color: theme?.colors?.white,
    textTransform: 'uppercase',
    paddingBottom: 10,
  },
  coinPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme?.colors?.troutOpacity30,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  coinQuantity: {
    flexDirection: 'row',
  },
  coinMetaLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme?.colors?.darkShadeLight60,
  },
  coinPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme?.colors?.white,
  },
  coinUnit: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
    paddingLeft: 10,
  },
  controllerContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controller: {
    width: '48%',
    borderRadius: 4,
  },
  tradesContainer: {
    backgroundColor: theme?.colors?.primary,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  tradesLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
})

export default AddToTradeModal
