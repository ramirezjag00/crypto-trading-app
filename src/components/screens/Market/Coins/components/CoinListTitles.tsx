import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'

import { coinListTitles } from '@constants/coins'
import theme from '@constants/theme'

const renderCoinTitle = ({ item }: { item: string }) => (
  <Text style={styles.coinListTitle}>{item}</Text>
)

const CoinListTitles: React.FC = () => {
  return (
    <FlatList
      data={coinListTitles}
      renderItem={renderCoinTitle}
      keyExtractor={(item, index) => `${item}-${index}`}
      horizontal
      style={styles.coinTitlesContainer}
      contentContainerStyle={styles.coinTitlesContentContainer}
      scrollEnabled={false}
    />
  )
}

const styles = StyleSheet.create({
  coinTitlesContainer: {
    flexGrow: 0,
  },
  coinTitlesContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 20,
    paddingBottom: 10,
  },
  coinListTitle: {
    fontSize: 12,
    color: theme?.colors?.darkShadeLight90,
  },
})

export default CoinListTitles
