import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import type TradeStackParamList from '@customtypes/navigation/trade'
import TradesScreen from '@screens/Trade/Trades/TradesScreen'

const TradeStack = createNativeStackNavigator<TradeStackParamList>()

const TradeStackRoutes: React.FC = () => (
  <TradeStack.Navigator
    initialRouteName="TradesScreen"
    screenOptions={{ headerShown: false }}>
    <TradeStack.Screen name="TradesScreen" component={TradesScreen} />
  </TradeStack.Navigator>
)

export default TradeStackRoutes
