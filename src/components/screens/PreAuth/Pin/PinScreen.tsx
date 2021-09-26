import React from 'react'
import PINCode from '@haskkor/react-native-pincode'

import useUserSetPinCode from '@utils/hooks/useUserSetPinCode'

const PinScreen: React.FC = () => {
  const withPin = useUserSetPinCode()

  return <PINCode status={!withPin ? 'choose' : 'enter'} />
}

export default PinScreen
