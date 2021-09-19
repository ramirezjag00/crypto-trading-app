import React from 'react'
import { TouchableOpacity, Platform, StyleSheet, Text } from 'react-native'

import theme from '@constants/theme'
import { useNavigation } from '@react-navigation/core'
import { CoinDefaultResponseType } from '@customtypes/coins/coin'

interface Props {
  coinListData?: CoinDefaultResponseType[]
}

const SearchPlaceholder: React.FC<Props> = (props) => {
  const { coinListData = [] } = props
  const navigation = useNavigation()
  const onPress = () => console.log('press')

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.placeholder}>Search for coin name or symbol</Text>
    </TouchableOpacity>
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
        paddingVertical: 5,
        paddingHorizontal: 20,
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
