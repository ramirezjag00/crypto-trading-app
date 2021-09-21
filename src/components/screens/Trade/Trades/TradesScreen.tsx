import React from 'react'
import { Text } from 'react-native'

import { useAppSelector } from '@utils/hooks/store'
import { selectAllCoinTrades } from '@store/api/coinTrades'

const TradesScreen: React.FC = () => {
  const coinTrades = useAppSelector(selectAllCoinTrades)
  console.log(coinTrades)

  return <Text>HELLO WORLD</Text>
}

export default TradesScreen
