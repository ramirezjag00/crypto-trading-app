import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MarketStack from '@routes/MarketStack'
import type BottomTabParamList from '@customtypes/navigation/bottomTab'
import theme from '@theme'
import coinsIcon from '@assets/coins.png'

const BottomTabBar = createBottomTabNavigator<BottomTabParamList>()

const BottomTabStack: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <BottomTabBar.Navigator
        initialRouteName="Market"
        screenOptions={{ headerShown: false }}>
        <BottomTabBar.Screen name="Market" component={MarketStack} />
      </BottomTabBar.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

export default BottomTabStack
