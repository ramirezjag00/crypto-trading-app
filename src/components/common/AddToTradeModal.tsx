import React from 'react'
import { StyleSheet, Text } from 'react-native'

import theme from '@constants/theme'
import Modal from './Modal'
import QuantityController from './QuantityController'
import { CoinAddTradeModalType } from '@customtypes/coins/coin'

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

  return (
    <Modal isVisible={isModalVisible} onCloseModal={onCloseModal} hasContainer>
      <Text style={styles.coinName}>{activeCoin?.name}</Text>
      <Text style={styles.coinPair}>
        {activeCoin?.symbol}/{activeCoin?.unit}
      </Text>
      <Text style={styles.coinPrice}>69.69696969</Text>
      <QuantityController
        quantity={activeCoinQuantity}
        onPress={onAmountChange}
      />
      <Text style={styles.coinTotal}>Total {activeCoin?.symbol}: </Text>
      <Text style={styles.coinTotalPrice} numberOfLines={2}>
        {69.69696969 * activeCoinQuantity}
      </Text>
    </Modal>
  )
}

const styles = StyleSheet.create({
  coinName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme?.colors?.white,
    paddingBottom: 15,
  },
  coinPair: {
    fontSize: 12,
    textAlign: 'center',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
    paddingBottom: 10,
  },
  coinPrice: {
    fontSize: 12,
    textAlign: 'center',
    color: theme?.colors?.white,
    paddingBottom: 10,
  },
  coinTotal: {
    paddingTop: 15,
    fontSize: 14,
    textAlign: 'center',
    color: theme?.colors?.white,
    paddingBottom: 10,
  },
  coinTotalPrice: {
    width: '80%',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: theme?.colors?.primary,
    textTransform: 'uppercase',
  },
})

export default AddToTradeModal