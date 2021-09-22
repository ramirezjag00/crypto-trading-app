import React from 'react'
import { StyleSheet, SafeAreaView, View, Text } from 'react-native'

import theme from '@constants/theme'
import SearchPlaceholder from './SearchPlaceholder'

interface Props {
  label: string
}

const Empty: React.FC<Props> = (props) => {
  const { label } = props
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchPlaceholder />
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyLabel}>{label}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: theme?.colors?.dark,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyLabel: {
    color: theme?.colors?.white,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
})

export default Empty
