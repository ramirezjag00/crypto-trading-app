import React from 'react'
import { StyleSheet, Image, ImageSourcePropType } from 'react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/core'

import MarketStack from '@routes/MarketStack'
import type BottomTabParamList from '@customtypes/navigation/bottomTab'
import theme from '@theme'
import coinsIcon from '@assets/coins.png'

const BottomTabBar = createBottomTabNavigator<BottomTabParamList>()

const BottomTabStack: React.FC = () => {
  const { colors } = theme

  const handleScreenOptions = ({
    route,
  }: {
    route: RouteProp<BottomTabParamList, 'Market'>
  }): BottomTabNavigationOptions => ({
    tabBarIcon: ({ color }): React.ReactNode => {
      let icon: ImageSourcePropType = 0
      const iconStyles = StyleSheet.flatten([
        styles.tabIcon,
        { tintColor: color },
      ])

      if (route.name === 'Market') {
        icon = coinsIcon as ImageSourcePropType
      }

      return <Image source={icon} style={iconStyles} />
    },
    headerShown: false,
    tabBarActiveTintColor: colors?.primary,
    tabBarInactiveTintColor: colors?.white,
    tabBarLabelStyle: styles.tabLabel,
    tabBarStyle: styles.tabBar,
  })

  return (
    <BottomTabBar.Navigator
      initialRouteName="Market"
      screenOptions={handleScreenOptions}>
      <BottomTabBar.Screen name="Market" component={MarketStack} />
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
  },
})

export default BottomTabStack
