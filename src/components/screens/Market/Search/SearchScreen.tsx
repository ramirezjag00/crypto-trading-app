import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { useRoute } from '@react-navigation/core'

import theme from '@constants/theme'
import { MarketStackRouteProp } from '@customtypes/navigation/market'

const SearchScreen: React.FC = () => {
  const route = useRoute<MarketStackRouteProp<'SearchScreen'>>()
  console.log('coinListData', route?.params?.coinListData)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Screen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: theme?.colors?.dark,
    textAlign: 'center',
  },
})

export default SearchScreen
