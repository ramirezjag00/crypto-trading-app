import React, { useState } from 'react'
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import debounce from 'lodash.debounce'

import theme from '@constants/theme'
import { MarketStackNavigationProp } from '@customtypes/navigation/market'
import { sanitizeString } from '@utils/string'
import Button from '@common/Button'

interface Props {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const SearchInput: React.FC<Props> = (props) => {
  const { value, setValue } = props
  const navigation = useNavigation<MarketStackNavigationProp<'SearchScreen'>>()

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
          style={inputStyles}
          onChangeText={handleSearchTextChange}
          selectionColor={theme?.colors?.primary}
          underlineColorAndroid="transparent"
          autoCorrect={false}
          autoFocus={true}
          returnKeyType="done"
          placeholder="Search for coin name or symbol"
          placeholderTextColor={theme?.colors?.darkShadeLight60}
          defaultValue={value}
          onSubmitEditing={Keyboard.dismiss}
        />
        {!!value && (
          <Text style={styles.clear} onPress={onClearText}>
            ✕
          </Text>
        )}
      </View>
      <Button
        buttonStyles={styles.cancelContainer}
        textStyles={styles.cancel}
        label="Cancel"
        onPress={onPressCancel}
      />
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
        paddingVertical: 0,
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
    ...Platform.select({
      android: {
        paddingVertical: 5,
      },
    }),
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
  clear: {
    alignSelf: 'center',
    fontSize: Platform.OS === 'ios' ? 15 : 20,
    color: theme?.colors?.darkShadeLight60,
  },
  cancelContainer: {
    ...Platform.select({
      android: {
        marginTop: 5,
      },
    }),
    alignSelf: 'center',
    paddingVertical: 10,
  },
  cancel: {
    color: theme?.colors?.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },
})

export default SearchInput
