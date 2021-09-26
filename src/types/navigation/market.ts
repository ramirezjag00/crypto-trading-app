import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

import { CoinDefaultResponseType, CoinUnitsType } from '@customtypes/coins/coin'
import BottomTabParamList from './bottomTab'

type SearchScreenPropType = {
  coinListData: CoinDefaultResponseType[]
  coinUnits: CoinUnitsType
}

type MarketStackParamList = {
  CoinsScreen: undefined
  SearchScreen: SearchScreenPropType
}

type MarketStackRouteProp<RouteName extends keyof MarketStackParamList> =
  RouteProp<MarketStackParamList, RouteName>

type MarketStackNavigationProp<RouteName extends keyof MarketStackParamList> =
  CompositeNavigationProp<
  StackNavigationProp<BottomTabParamList>,
  StackNavigationProp<MarketStackParamList, RouteName>
  >

export {
  MarketStackParamList as default,
  MarketStackRouteProp,
  MarketStackNavigationProp,
}
