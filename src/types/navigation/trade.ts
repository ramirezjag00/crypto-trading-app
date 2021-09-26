import { CompositeNavigationProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import BottomTabParamList from './bottomTab'

type TradeStackParamList = {
  TradesScreen: undefined
  OrdersScreen: undefined
}

type TradeStackNavigationProp<RouteName extends keyof TradeStackParamList> =
  CompositeNavigationProp<
  StackNavigationProp<BottomTabParamList>,
  StackNavigationProp<TradeStackParamList, RouteName>
  >

export { TradeStackParamList as default, TradeStackNavigationProp }
