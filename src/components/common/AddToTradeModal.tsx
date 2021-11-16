import React from 'react'
import { Keyboard } from 'react-native'

import Modal from './Modal'
import { CoinTradeType } from '@customtypes/coins/coin'
import TradeCard from './TradeCard'
import { useAppDispatch, useAppSelector } from '@utils/hooks/store'
import { selectCoinTradeEntities, upsertCoinTrade } from '@store/api/coinTrades'

interface Props {
  isModalVisible: boolean
  onCloseModal: () => void
  activeCoin?: CoinTradeType
}

const AddToTradeModal: React.FC<Props> = (props) => {
  const { activeCoin, isModalVisible, onCloseModal } = props
  const coinTradeEntities = useAppSelector(selectCoinTradeEntities)
  const dispatch = useAppDispatch()

  const handleCloseModal = (): void => {
    Keyboard.dismiss()
    onCloseModal()
  }

  const onPressAddToTrades = (coinTrade: CoinTradeType): void => {
    const existingCoinTrade = coinTradeEntities[coinTrade?.id]
    dispatch(
      upsertCoinTrade({
        ...coinTrade,
        amount:
          existingCoinTrade?.amount && coinTrade?.amount
            ? coinTrade?.amount + existingCoinTrade?.amount
            : coinTrade?.amount,
      }),
    )
    handleCloseModal()
  }

  return (
    <Modal
      isVisible={isModalVisible}
      onCloseModal={handleCloseModal}
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
