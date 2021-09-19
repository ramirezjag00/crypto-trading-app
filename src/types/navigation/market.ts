import { CompositeNavigationProp, RouteProp } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { CoinDefaultResponseType } from '@customtypes/coins/coin'
import BottomTabParamList from './bottomTab'

type SearchScreenPropType = {
  coinListData: CoinDefaultResponseType[]
}

type MarketStackParamList = {
  CoinsScreen: undefined
  SearchScreen: SearchScreenPropType
}

type MarketStackRouteProp<RouteName extends keyof MarketStackParamList> =
  RouteProp<MarketStackParamList, RouteName>

type MarketStackNavigationProp<RouteName extends keyof MarketStackParamList> =
  CompositeNavigationProp<
    NativeStackNavigationProp<BottomTabParamList>,
    NativeStackNavigationProp<MarketStackParamList, RouteName>
  >

export {
  MarketStackParamList as default,
  MarketStackRouteProp,
  MarketStackNavigationProp,
}
