import React from 'react'
import {
  ActivityIndicator as RNActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'

import theme from '@constants/theme'

interface Props {
  color?: string
  size?: 'small' | 'large'
  style?: StyleProp<ViewStyle>
}

const ActivityIndicator: React.FC<Props> = (props) => {
  const { color = theme?.colors?.primary, size = 'large', style } = props
  const loadingStyles = StyleSheet.flatten([styles.container, style])

  return <RNActivityIndicator color={color} size={size} style={loadingStyles} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default ActivityIndicator
