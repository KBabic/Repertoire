import React from 'react'
import { View, Text, Image } from 'react-native'
import Button from '../../components/Button/Button'
import { styles } from './welcomeStyles'

const Welcome = ({ navigation }) => {
   const handleSignUp = () => {
      navigation.navigate("SignUp")
   }
   const handleLogIn = () => {
      navigation.navigate("LogIn")
   }
   const { container, textContainer, text, logo} = styles
   return (
      <View style={container}>
         <View style={textContainer}>
            <Image 
               source={require('../../assets/logo.png')} 
               style={logo}
            />
            <Text style={text}>Welcome to repertoiRe!</Text>
         </View>
         <Button 
            text="Sign Up" 
            color="#0040C9"
            onPress={handleSignUp}
         />
         <Button 
            text="Log In" 
            color="#32A1F0"
            onPress={handleLogIn}
         />
      </View>
   )
}
export default Welcome