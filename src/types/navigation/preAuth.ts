import { CompositeNavigationProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import type RootStackParamList from './root'

type PreAuthStackParamList = {
  PinScreen: undefined
}

type PreAuthStackNavigationProp<RouteName extends keyof PreAuthStackParamList> =
  CompositeNavigationProp<
  StackNavigationProp<RootStackParamList>,
  StackNavigationProp<PreAuthStackParamList, RouteName>
  >

export { PreAuthStackParamList as default, PreAuthStackNavigationProp }
