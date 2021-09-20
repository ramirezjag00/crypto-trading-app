import theme from '@constants/theme'
import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

interface Props {
  onPress: () => void
  buttonStyles?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
  iconStyles?: StyleProp<ImageStyle>
  label: string
  icon?: ImageSourcePropType
  disabled?: boolean
}

const Button: React.FC<Props> = (props) => {
  const {
    onPress,
    buttonStyles,
    textStyles,
    iconStyles,
    label,
    icon,
    disabled = false,
  } = props

  const containerStyles = StyleSheet.flatten([
    buttonStyles,
    disabled && styles.disabled,
  ])

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled}>
      {icon && <Image source={icon} style={iconStyles} />}
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: theme?.colors?.darkShadeLight30,
  },
})

export default Button
