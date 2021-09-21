import React from 'react'

import Modal from './Modal'
import { CoinAddTradeModalType, CoinTradeType } from '@customtypes/coins/coin'
import TradeCard from './TradeCard'

interface Props {
  isModalVisible: boolean
  onCloseModal: () => void
  activeCoin: CoinAddTradeModalType | null
}

const AddToTradeModal: React.FC<Props> = (props) => {
  const { activeCoin, isModalVisible, onCloseModal } = props

  const onPressAddToTrades = (coinTrade: CoinTradeType): void => {
    console.log(coinTrade)
    onCloseModal()
  }

  return (
    <Modal isVisible={isModalVisible} onCloseModal={onCloseModal} hasContainer>
      <TradeCard
        buttonLabel="Add to Trades"
        onPressButton={onPressAddToTrades}
        activeCoin={activeCoin}
      />
    </Modal>
  )
}

export default AddToTradeModal
