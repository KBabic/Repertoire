import React from 'react'
import { View, Text, Image } from 'react-native'
import Button from '../../components/Button/Button'
import { styles } from './welcomeStyles'
import { getItem } from '../../store/store'
import { inject } from 'mobx-react'

@inject("store")
class Welcome extends React.Component {

   async componentDidMount() {
      this.email = await getItem("email")
      this.password = await getItem("password")
      this.email && this.props.store.updateEmail(this.email)
      this.password && this.props.store.updatePassword(this.password)
   }
   handleSignUp = () => {
      this.props.navigation.navigate("SignUp")
   }
   handleLogIn = () => {
      this.props.navigation.navigate("LogIn")
   }
   render () {
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
               onPress={this.handleSignUp}
            />
            <Button 
               text="Log In" 
               color="#32A1F0"
               onPress={this.handleLogIn}
            />
         </View>
      )
   }
}
export default Welcome