import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { CoinDefault } from '@customtypes/coins/coin'
import { get } from '@api'
import theme from '@theme'

const renderItem = ({ item }: { item: CoinDefault }) => (
  <View key={item?.id} style={styles.coinContainer}>
    <Text style={styles.coinDetail} numberOfLines={2}>
      {item?.name}
    </Text>
    <Text style={styles.coinDetail} numberOfLines={2}>
      {item?.symbol}
    </Text>
  </View>
)

const separator = () => <View style={styles.separator} />

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

  const data = !hasError && !!coins?.length ? coins : []

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.title}>List of cryptocurrencies here</Text>
      <View style={styles.coinsContainer}>
        {renderItem({ item: { id: 'ID', name: 'Name', symbol: 'SYMBOL' } })}
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        style={styles.coinsContainer}
        ItemSeparatorComponent={separator}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme?.colors?.dark,
  },
  title: {
    color: theme?.colors?.white,
    fontSize: 24,
    textAlign: 'center',
  },
  coinsContainer: {
    paddingHorizontal: 20,
  },
  separator: {
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
  },
  coinContainer: {
    flexDirection: 'row',
  },
  coinDetail: {
    flex: 2,
    textAlign: 'center',
    fontSize: 14,
    color: theme?.colors?.white,
    paddingVertical: 5,
  },
})

export default CoinsScreen
