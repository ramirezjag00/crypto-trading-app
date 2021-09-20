import React from 'react'
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import theme from '@constants/theme'

interface Props {
  isVisible?: boolean
  children: React.ReactNode
  onCloseModal?: () => void
}

const Modal: React.FC<Props> = (props) => {
  const { isVisible = false, onCloseModal, children } = props

  return (
    <RNModal
      animationType="fade"
      visible={isVisible}
      transparent
      hardwareAccelerated>
      <TouchableOpacity
        style={styles.modalCointainer}
        onPress={onCloseModal}
        activeOpacity={1}>
        <View style={styles.container}>{children}</View>
      </TouchableOpacity>
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
    width: '80%',
    backgroundColor: theme?.colors?.dark,
    borderRadius: 5,
    marginHorizontal: 40,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    zIndex: 1,
  },
})

export default Modal
