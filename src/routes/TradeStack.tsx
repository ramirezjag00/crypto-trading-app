import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'

import type TradeStackParamList from '@customtypes/navigation/trade'
import TradesScreen from '@screens/Trade/Trades/TradesScreen'
import OrdersScreen from '@screens/Trade/Orders/OrdersScreen'
import theme from '@constants/theme'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TradeStackNavigationProp } from '@customtypes/navigation/trade'

const TradeStack = createStackNavigator<TradeStackParamList>()

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: theme?.colors?.dark,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  order: {
    color: theme?.colors?.primary,
    paddingRight: 10,
  },
  headerLeftContainer: {
    paddingLeft: 5,
  }
})

const handleStackScreenOptions: StackNavigationOptions = {
  headerStyle: styles.headerStyle,
  headerTintColor: theme?.colors?.white,
  headerTitleStyle: styles.headerTitleStyle,
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerLeftContainerStyle: styles.headerLeftContainer,
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
        headerLeft: () => undefined,
        headerRight: () => (
          <RightHeaderButton title="Orders" navigation={navigation} />
        ),
      })}
    />
    <TradeStack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={{
        title: 'Order History',
      }}
    />
  </TradeStack.Navigator>
)

export default TradeStackRoutes
