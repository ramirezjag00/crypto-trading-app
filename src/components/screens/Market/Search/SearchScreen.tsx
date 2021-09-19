import React, { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/core'

import theme from '@constants/theme'
import { MarketStackRouteProp } from '@customtypes/navigation/market'

const SearchScreen: React.FC = () => {
  const route = useRoute<MarketStackRouteProp<'SearchScreen'>>()
  const [value, setValue] = useState<string>('')
  console.log('coinListData', route?.params?.coinListData)

  return (
    <SafeAreaView style={styles.safeAreaView}>
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
