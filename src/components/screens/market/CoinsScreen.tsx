import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'

import { CoinDefault } from '@customtypes/coins/coin'
import { get } from '@api'

const CoinsScreen: React.FC = () => {
  const [coins, setCoins] = useState<CoinDefault[]>([])
  const [hasError, setHasError] = useState<boolean>(false)

  const getCoins = async (): Promise<void> => {
    try {
      const response = await get<CoinDefault[]>('/coins/list', {
        include_platform: false,
      })
      setCoins(response)
    } catch (error) {
      setHasError(true)
    }
  }

  useEffect(() => {
    if (!coins?.length) {
      getCoins()
    }
  }, [coins])

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>List of cryptocurrencies here</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
})

export default CoinsScreen
