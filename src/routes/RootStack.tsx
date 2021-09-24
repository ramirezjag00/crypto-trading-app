import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTabStack from '@routes/BottomTabStack'
import type RootStackParamList from '@customtypes/navigation/root'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomTabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
