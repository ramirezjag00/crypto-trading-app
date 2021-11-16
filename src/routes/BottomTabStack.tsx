import React from 'react'
import { StyleSheet, Image, ImageSourcePropType } from 'react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import MarketStack from '@routes/MarketStack'
import TradeStack from '@routes/TradeStack'
import type BottomTabParamList from '@customtypes/navigation/bottomTab'
import theme from '@theme'
import coinsIcon from '@assets/coins.png'
import marketIcon from '@assets/market.png'
import { useAppSelector } from '@utils/hooks/store'
import { selectTotalCoinTrades } from '@store/api/coinTrades'
import { BottomTabRouteProp } from '@customtypes/navigation/bottomTab'

const BottomTabBar = createBottomTabNavigator<BottomTabParamList>()

const BottomTabStack: React.FC = () => {
  const { colors } = theme
  const coinTradesTotal = useAppSelector(selectTotalCoinTrades)

  const handleScreenOptions = ({
    route,
  }: {
    route: BottomTabRouteProp<'Market' | 'Trade'>
  }): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color }): React.ReactNode => {
      let icon: ImageSourcePropType = 0
      const iconStyles = StyleSheet.flatten([
        styles.tabIcon,
        { tintColor: color },
      ])

      if (route.name === 'Market') {
        icon = marketIcon as ImageSourcePropType
      } else if (route.name === 'Trade') {
        icon = coinsIcon as ImageSourcePropType
      }

      return <Image source={icon} style={iconStyles} />
    },
    headerShown: false,
    tabBarActiveTintColor: colors?.primary,
    tabBarInactiveTintColor: colors?.white,
    tabBarLabelStyle: styles.tabLabel,
    tabBarStyle: styles.tabBar,
    tabBarHideOnKeyboard: true,
  })

  return (
    <BottomTabBar.Navigator
      initialRouteName="Market"
      screenOptions={handleScreenOptions}>
      <BottomTabBar.Screen name="Market" component={MarketStack} />
      <BottomTabBar.Screen
        name="Trade"
        component={TradeStack}
        options={{
          tabBarBadge: coinTradesTotal ? coinTradesTotal : undefined,
        }}
      />
    </BottomTabBar.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 25,
    height: 25,
  },
  tabLabel: {
    textTransform: 'uppercase',
  },
  tabBar: {
    backgroundColor: theme?.colors?.dark,
    borderTopWidth: 1,
    borderTopColor: theme?.colors?.darkShadeLight20,
  },
})

export default BottomTabStack
