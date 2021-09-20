import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/core'

import theme from '@constants/theme'
import { MarketStackRouteProp } from '@customtypes/navigation/market'
import SearchInput from './components/SearchInput'
import {
  CoinAddTradeModalType,
  CoinDefaultResponseType,
} from '@customtypes/coins/coin'
import SearchCoinsList from './components/SearchCoinsList'
import AddToTradeModal from '@common/AddToTradeModal'

const SearchScreen: React.FC = () => {
  const route = useRoute<MarketStackRouteProp<'SearchScreen'>>()
  const { coinListData, coinUnits } = route?.params
  const [value, setValue] = useState<string>('')
  const [activeUnit, setActiveUnit] = useState<string>('btc')
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [coins, setCoins] = useState<CoinDefaultResponseType[]>([])
  const [activeCoin, setActiveCoin] = useState<CoinAddTradeModalType | null>(
    null,
  )
  const [activeCoinQuantity, setActiveCoinQuantity] = useState<number>(0)

  const onCloseModal = (): void => {
    setIsModalVisible(false)
    setActiveCoin(null)
    setActiveCoinQuantity(0)
  }

  const onShowModal = (coin: CoinAddTradeModalType): void => {
    setIsModalVisible(true)
    setActiveCoin(coin)
  }

  const onAmountChange = (isIncreasing: boolean) => (): void => {
    if (isIncreasing) {
      setActiveCoinQuantity((num) => num + 1)
    } else if (!isIncreasing && !!activeCoinQuantity) {
      setActiveCoinQuantity((num) => num - 1)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchInput value={value} setValue={setValue} />
      <SearchCoinsList
        activeUnit={activeUnit}
        coinListData={coinListData}
        coins={coins}
        coinUnits={coinUnits}
        setActiveUnit={setActiveUnit}
        setCoins={setCoins}
        value={value}
        onShowModal={onShowModal}
      />
      <AddToTradeModal
        isModalVisible={isModalVisible}
        onCloseModal={onCloseModal}
        activeCoin={activeCoin}
        activeCoinQuantity={activeCoinQuantity}
        onAmountChange={onAmountChange}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme?.colors?.dark,
  },
})

export default SearchScreen
