import React from 'react'

import Modal from './Modal'
import { CoinAddTradeModalType } from '@customtypes/coins/coin'
import TradeCard from './TradeCard'

interface Props {
  isModalVisible: boolean
  onCloseModal: () => void
  activeCoin: CoinAddTradeModalType | null
}

const AddToTradeModal: React.FC<Props> = (props) => {
  const { activeCoin, isModalVisible, onCloseModal } = props

  const onPressAddToTrades = (): void => {
    onCloseModal()
  }

  const handleModalClose = (): void => {
    onCloseModal()
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onCloseModal={handleModalClose}
      hasContainer>
      <TradeCard
        buttonLabel="Add to Trades"
        onPressButton={onPressAddToTrades}
        activeCoin={activeCoin}
      />
    </Modal>
  )
}

export default AddToTradeModal
