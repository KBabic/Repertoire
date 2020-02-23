import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'mobx-react'
import AppStore from './store/store'

import Welcome from './screens/Welcome/Welcome'
import SignUp from './screens/SignUp/SignUp'
import LogIn from './screens/LogIn/LogIn'
import Home from './screens/Home/Home'
import Movie from './screens/Movie/Movie'

const store = window.store = new AppStore()

const Stack = createStackNavigator()
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Movie" component={Movie} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  )
}

export default App