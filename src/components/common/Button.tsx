import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
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
}

const Button: React.FC<Props> = (props) => {
  const { onPress, buttonStyles, textStyles, iconStyles, label, icon } = props

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      {icon && <Image source={icon} style={iconStyles} />}
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  )
}

export default Button
