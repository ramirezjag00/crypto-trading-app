import React from 'react'

import Modal from './Modal'
import { CoinAddTradeModalType, CoinTradeType } from '@customtypes/coins/coin'
import TradeCard from './TradeCard'
import { useAppDispatch } from '@utils/hooks/store'
import { upsertCoinTrade } from '@store/api/coinTrades'

interface Props {
  isModalVisible: boolean
  onCloseModal: () => void
  activeCoin: CoinAddTradeModalType | null
}

const AddToTradeModal: React.FC<Props> = (props) => {
  const { activeCoin, isModalVisible, onCloseModal } = props
  const dispatch = useAppDispatch()

  const onPressAddToTrades = (coinTrade: CoinTradeType): void => {
    dispatch(upsertCoinTrade(coinTrade))
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
