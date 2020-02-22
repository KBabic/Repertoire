import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Welcome from './screens/Welcome/Welcome'
import SignUp from './screens/SignUp/SignUp'
import LogIn from './screens/LogIn/LogIn'
import Home from './screens/Home/Home'

const Stack = createStackNavigator()
function App() {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App