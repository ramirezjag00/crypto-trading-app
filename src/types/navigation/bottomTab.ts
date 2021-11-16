import MarketStackParamList from '@customtypes/navigation/market'
import NestedNavigator from './nested'

type BottomTabParamList = {
  Market: NestedNavigator<MarketStackParamList>
}

export default BottomTabParamList
