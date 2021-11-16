import { CompositeNavigationProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import BottomTabParamList from './bottomTab'

type TradeStackParamList = {
  TradesScreen: undefined
  OrdersScreen: undefined
}

type TradeStackNavigationProp<RouteName extends keyof TradeStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<BottomTabParamList>,
    NativeStackNavigationProp<TradeStackParamList, RouteName>
  >

export { TradeStackParamList as default, TradeStackNavigationProp }
