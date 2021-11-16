import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PreAuthStackParamList from '@customtypes/navigation/preAuth'
import PinScreen from '@screens/PreAuth/Pin/PinScreen'

const PreAuthStack = createStackNavigator<PreAuthStackParamList>()

const PreAuthStackRoutes: React.FC = () => {
  return (
    <PreAuthStack.Navigator
      initialRouteName="PinScreen"
      screenOptions={{ headerShown: false }}>
      <PreAuthStack.Screen name="PinScreen" component={PinScreen} />
    </PreAuthStack.Navigator>
  )
}

export default PreAuthStackRoutes
