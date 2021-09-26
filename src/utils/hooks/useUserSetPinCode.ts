import { hasUserSetPinCode } from '@haskkor/react-native-pincode'
import { useEffect, useState } from 'react'

const useUserSetPinCode = (): boolean | undefined => {
  const [withPin, setWithPin] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const getPin = async (): Promise<void> => {
      const hasPin = (await hasUserSetPinCode()) as boolean
      setWithPin(hasPin)
    }

    getPin()
  }, [])

  return withPin
}

export default useUserSetPinCode
