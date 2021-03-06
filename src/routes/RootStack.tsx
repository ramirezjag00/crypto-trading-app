import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import BottomTabStack from '@routes/BottomTabStack'
import type RootStackParamList from '@customtypes/navigation/root'
import PreAuthStack from './PreAuthStack'

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootStack: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="PreAuth"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={BottomTabStack} />
          <Stack.Screen name="PreAuth" component={PreAuthStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default RootStack
