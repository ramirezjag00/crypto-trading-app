import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

import type TradeStackParamList from '@customtypes/navigation/trade'
import TradesScreen from '@screens/Trade/Trades/TradesScreen'
import OrdersScreen from '@screens/Trade/Orders/OrdersScreen'
import theme from '@constants/theme'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TradeStackNavigationProp } from '@customtypes/navigation/trade'

const TradeStack = createNativeStackNavigator<TradeStackParamList>()

const handleStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme?.colors?.dark,
  },
  headerTintColor: theme?.colors?.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleVisible: false,
}

const RightHeaderButton = ({
  title,
  navigation,
}: {
  title: string
  navigation: TradeStackNavigationProp<'TradesScreen'>
}) => (
  <TouchableOpacity onPress={() => navigation.navigate('OrdersScreen')}>
    <Text style={styles.order}>{title}</Text>
  </TouchableOpacity>
)

const TradeStackRoutes: React.FC = () => (
  <TradeStack.Navigator
    initialRouteName="TradesScreen"
    screenOptions={handleStackScreenOptions}>
    <TradeStack.Screen
      name="TradesScreen"
      component={TradesScreen}
      options={({
        navigation,
      }: {
        navigation: TradeStackNavigationProp<'TradesScreen'>
      }) => ({
        title: 'Trades',
        headerRight: () => (
          <RightHeaderButton title="Orders" navigation={navigation} />
        ),
      })}
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

const styles = StyleSheet.create({
  order: {
    color: theme?.colors?.primary,
  },
})

export default TradeStackRoutes
