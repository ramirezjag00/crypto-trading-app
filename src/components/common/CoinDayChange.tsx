import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '@constants/theme'

interface Props {
  coin24Change: string
}

const CoinDayChange: React.FC<Props> = (props) => {
  const { coin24Change } = props
  const change24HStyles = StyleSheet.flatten([
    styles.coin24HChgCointainer,
    coin24Change?.includes('-')
      ? styles.coin24HChgBearish
      : coin24Change === '0.00'
      ? {}
      : styles.coin24HChgBullish,
  ])

  return (
    <View style={change24HStyles}>
      <Text style={styles.coin24hChg}>{coin24Change}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  coin24HChgCointainer: {
    backgroundColor: theme?.colors?.darkShadeLight40,
    padding: 10,
    borderRadius: 4,
  },
  coin24HChgBearish: {
    backgroundColor: theme?.colors?.bearishRed,
  },
  coin24HChgBullish: {
    backgroundColor: theme?.colors?.bullishGreen,
  },
  coin24hChg: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme?.colors?.white,
    textTransform: 'uppercase',
  },
})

export default CoinDayChange
