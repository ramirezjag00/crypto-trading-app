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

  const onCloseModal = (): void => {
    setIsModalVisible(false)
    setActiveCoin(null)
  }

  const onShowModal = (coin: CoinAddTradeModalType): void => {
    setIsModalVisible(true)
    setActiveCoin(coin)
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
