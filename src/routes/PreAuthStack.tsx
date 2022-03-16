import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PreAuthStackParamList from '@customtypes/navigation/preAuth'
import PinScreen from '@screens/PreAuth/Pin/PinScreen'

const PreAuthStack = createNativeStackNavigator<PreAuthStackParamList>()

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
