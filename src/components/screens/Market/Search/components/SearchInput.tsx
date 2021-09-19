import React from 'react'
import { StyleSheet, View } from 'react-native'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: React.FC<Props> = (props) => {
  const { value, setValue } = props

  return <View style={styles.searchContainer}></View>
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
})

export default SearchInput
