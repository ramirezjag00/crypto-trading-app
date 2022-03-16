import MarketStackParamList from '@customtypes/navigation/market'
import TradeStackParamList from '@customtypes/navigation/trade'
import { RouteProp } from '@react-navigation/core'

import NestedNavigator from './nested'

type BottomTabParamList = {
  Market: NestedNavigator<MarketStackParamList>
  Trade: TradeStackParamList
}

type BottomTabRouteProp<RouteName extends keyof BottomTabParamList> = RouteProp<
  BottomTabParamList,
  RouteName
>

export { BottomTabParamList as default, BottomTabRouteProp }
