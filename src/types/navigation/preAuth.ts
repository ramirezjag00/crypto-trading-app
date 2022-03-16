import { CompositeNavigationProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import type RootStackParamList from './root'

type PreAuthStackParamList = {
  PinScreen: undefined
}

type PreAuthStackNavigationProp<RouteName extends keyof PreAuthStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList>,
    NativeStackNavigationProp<PreAuthStackParamList, RouteName>
  >

export { PreAuthStackParamList as default, PreAuthStackNavigationProp }
