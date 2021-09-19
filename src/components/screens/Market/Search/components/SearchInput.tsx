import React, { useRef, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import debounce from 'lodash.debounce'

import theme from '@constants/theme'
import { MarketStackNavigationProp } from '@customtypes/navigation/market'
import { sanitizeString } from '@utils/string'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: React.FC<Props> = (props) => {
  const { value, setValue } = props
  const navigation = useNavigation<MarketStackNavigationProp<'SearchScreen'>>()

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

  const onClearText = (): void => setValue('')

  const [debounceSearchText] = useState(() => debounce(onTextChange, 300))

  const handleSearchTextChange = (text: string) => debounceSearchText(text)

  const onPressCancel = () => navigation.goBack()

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
        {!!value && (
          <TouchableOpacity style={styles.clearContainer} onPress={onClearText}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.cancel} onPress={onPressCancel}>
        Cancel
      </Text>
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
  clearContainer: {
    height: 12,
    width: 12,
    borderColor: theme?.colors?.darkShadeLight60,
    borderWidth: 1,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clear: {
    fontSize: 10,
    color: theme?.colors?.darkShadeLight60,
  },
  cancel: {
    color: theme?.colors?.primary,
    fontSize: 11,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})

export default SearchInput
