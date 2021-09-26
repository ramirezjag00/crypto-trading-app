import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import theme from '@constants/theme'
import { CoinDefaultResponseType, CoinUnitsType } from '@customtypes/coins/coin'
import { MarketStackNavigationProp } from '@customtypes/navigation/market'
import Button from './Button'

interface Props {
  coinListData?: CoinDefaultResponseType[]
  coinUnits?: CoinUnitsType
}

const SearchPlaceholder: React.FC<Props> = (props) => {
  const { coinListData = [], coinUnits } = props
  const navigation = useNavigation<MarketStackNavigationProp<'SearchScreen'>>()
  const onPress = () =>
    navigation.navigate('Market', {
      screen: 'SearchScreen',
      params: { coinListData, coinUnits },
    })

  return (
    <Button
      buttonStyles={styles.container}
      textStyles={styles.placeholder}
      label="Search for coin name or symbol"
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    ...Platform.select({
      ios: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      android: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
      },
    }),
    marginHorizontal: 10,
    borderRadius: 8,
    backgroundColor: theme?.colors?.darkShadeLight30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 12,
    color: theme?.colors?.darkShadeLight60,
  },
})

export default SearchPlaceholder
