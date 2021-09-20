import React from 'react'
import { StyleSheet, Text } from 'react-native'

import theme from '@constants/theme'
import Modal from './Modal'
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
})

export default AddToTradeModal
