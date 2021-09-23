import MarketStackParamList from '@customtypes/navigation/market'
import TradeStackParamList from '@customtypes/navigation/trade'
import NestedNavigator from './nested'

type BottomTabParamList = {
  Market: NestedNavigator<MarketStackParamList>
  Trade: TradeStackParamList
}

export default BottomTabParamList
