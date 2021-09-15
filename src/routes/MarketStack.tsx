import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CoinsScreen from '../components/screens/coins/CoinsScreen'
import type MarketStackParamList from '../types/navigation/market'

const MarketStack = createNativeStackNavigator<MarketStackParamList>()

const MarketStackRoutes: React.FC = () => (
  <MarketStack.Navigator
    initialRouteName="CoinsScreen"
    screenOptions={{ headerShown: false }}>
    <MarketStack.Screen name="CoinsScreen" component={CoinsScreen} />
  </MarketStack.Navigator>
)

export default MarketStackRoutes
