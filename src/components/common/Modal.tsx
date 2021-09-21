import React from 'react'
import {
  Modal as RNModal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import theme from '@constants/theme'

interface Props {
  isVisible: boolean
  children: React.ReactNode
  onCloseModal: () => void
  onPress?: () => void
  wrapperStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  hasContainer: boolean
}

const Modal: React.FC<Props> = (props) => {
  const {
    isVisible = false,
    onCloseModal,
    onPress = () => null,
    children,
    wrapperStyle = {},
    containerStyle = {},
    hasContainer = false,
  } = props
  const modalStyles = StyleSheet.flatten([styles.modalCointainer, wrapperStyle])
  const containerStyles = StyleSheet.flatten([styles.container, containerStyle])

  const modalContent = (
    <>
      {hasContainer ? (
        <TouchableOpacity
          style={containerStyles}
          onPress={onPress}
          activeOpacity={1}>
          {children}
        </TouchableOpacity>
      ) : (
        children
      )}
    </>
  )

  return (
    <RNModal
      animationType="fade"
      visible={isVisible}
      transparent
      hardwareAccelerated>
      {onCloseModal ? (
        <TouchableOpacity
          style={modalStyles}
          onPress={onCloseModal}
          activeOpacity={0.8}>
          {modalContent}
        </TouchableOpacity>
      ) : (
        <View style={modalStyles}>{modalContent}</View>
      )}
    </RNModal>
  )
}

const styles = StyleSheet.create({
  modalCointainer: {
    flex: 1,
    backgroundColor: theme?.colors?.troutOpacity30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    zIndex: 1,
    width: '90%',
    backgroundColor: theme?.colors?.dark,
    borderRadius: 5,
    marginHorizontal: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
})

export default Modal
