import React, { useRef, useState } from 'react'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import debounce from 'lodash.debounce'

import theme from '@constants/theme'
import { sanitizeString } from '@utils/string'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: React.FC<Props> = (props) => {
  const { value, setValue } = props

  const inputRef = useRef<TextInput>(null)
  const inputStyles = StyleSheet.flatten([
    styles.searchBox,
    !value.length && styles.text,
  ])

  const onTextChange = (text = '') => {
    const parsedText = sanitizeString(text)
    if (parsedText.length) {
      setValue(parsedText)
    } else {
      setValue('')
    }
  }

  const [debounceSearchText] = useState(() => debounce(onTextChange, 300))

  const handleSearchTextChange = (text: string) => debounceSearchText(text)

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInput}>
        <TextInput
          ref={inputRef}
          style={inputStyles}
          onChangeText={handleSearchTextChange}
          selectionColor={theme?.colors?.primary}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoFocus={true}
          returnKeyType="search"
          placeholder="Search for coin name or symbol"
          placeholderTextColor={theme?.colors?.darkShadeLight60}
          defaultValue={value}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  searchInput: {
    position: 'relative',
    flex: 1,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
        paddingHorizontal: 20,
      },
      android: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 10,
      },
    }),
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: theme?.colors?.darkShadeLight30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    marginHorizontal: 8,
    color: theme?.colors?.darkShadeLight60,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
})

export default SearchInput
