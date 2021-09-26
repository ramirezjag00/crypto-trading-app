import React from 'react'
import PINCode from '@haskkor/react-native-pincode'
import { useNavigation } from '@react-navigation/core'
import RNExitApp from 'react-native-exit-app'

import useUserSetPinCode from '@utils/hooks/useUserSetPinCode'
import { PreAuthStackNavigationProp } from '@customtypes/navigation/preAuth'

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
    />
  )
}

export default PinScreen
