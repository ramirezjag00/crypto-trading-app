import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import PINCode from '@haskkor/react-native-pincode'
import RNExitApp from 'react-native-exit-app'

import useUserSetPinCode from '@utils/hooks/useUserSetPinCode'
import { PreAuthStackNavigationProp } from '@customtypes/navigation/preAuth'
import theme from '@constants/theme'

const PinScreen: React.FC = () => {
  const withPin = useUserSetPinCode()
  const navigation = useNavigation<PreAuthStackNavigationProp<'PinScreen'>>()

  const onFinishProcess = (): void => {
    navigation.navigate('Main')
  }

  const onQuitApp = (): void => RNExitApp.exitApp()

  return (
    <PINCode
      status={!withPin ? 'choose' : 'enter'}
      finishProcess={onFinishProcess}
      touchIDDisabled
      onClickButtonLockedPage={onQuitApp}
      delayBetweenAttempts={1500}
      styleMainContainer={styles.container}
      colorPassword={theme?.colors?.primary}
      colorPasswordEmpty={theme?.colors?.primary}
      colorPasswordError={theme?.colors?.bearishRed}
      colorCircleButtons={theme?.colors?.troutOpacity30}
      numbersButtonOverlayColor={theme?.colors?.primary}
      styleLockScreenButton={styles.lockButton}
      styleLockScreenMainContainer={styles.container}
      styleLockScreenText={styles.lockText}
      styleLockScreenTextTimer={styles.lockText}
      styleLockScreenViewTimer={styles.lockScreenViewTimer}
      styleLockScreenTitle={styles.lockScreenTitle}
      styleLockScreenViewIcon={styles.lockScreenViewIcon}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors?.dark,
  },
  lockButton: {
    backgroundColor: theme.colors?.primary,
    borderRadius: 4,
    width: '80%',
    alignItems: 'center',
  },
  lockText: {
    color: theme?.colors.darkShadeLight20,
  },
  lockScreenViewTimer: {
    borderColor: theme?.colors.darkShadeLight20,
  },
  lockScreenTitle: {
    color: theme?.colors.darkShadeLight20,
    opacity: 1,
    fontWeight: '300',
    fontSize: 25,
    textAlign: 'center',
  },
  lockScreenViewIcon: {
    display: 'none',
  },
})

export default PinScreen
