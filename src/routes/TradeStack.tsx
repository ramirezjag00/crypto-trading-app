import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

import type TradeStackParamList from '@customtypes/navigation/trade'
import TradesScreen from '@screens/Trade/Trades/TradesScreen'
import OrdersScreen from '@screens/Trade/Orders/OrdersScreen'
import theme from '@constants/theme'

const TradeStack = createNativeStackNavigator<TradeStackParamList>()

const handleStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme?.colors?.dark,
  },
  headerTintColor: theme?.colors?.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

const TradeStackRoutes: React.FC = () => (
  <TradeStack.Navigator
    initialRouteName="TradesScreen"
    screenOptions={handleStackScreenOptions}>
    <TradeStack.Screen
      name="TradesScreen"
      component={TradesScreen}
      options={{
        title: 'Trades',
      }}
    />
    <TradeStack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{
        title: 'Orders',
      }}
    />
  </TradeStack.Navigator>
)

export default TradeStackRoutes
