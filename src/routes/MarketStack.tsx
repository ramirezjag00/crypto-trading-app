import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CoinsScreen from '@screens/Market/Coins/CoinsScreen'
import type MarketStackParamList from '@customtypes/navigation/market'

const MarketStack = createNativeStackNavigator<MarketStackParamList>()

const MarketStackRoutes: React.FC = () => (
  <MarketStack.Navigator
    initialRouteName="CoinsScreen"
    screenOptions={{ headerShown: false }}>
    <MarketStack.Screen name="CoinsScreen" component={CoinsScreen} />
  </MarketStack.Navigator>
)

export default MarketStackRoutes
