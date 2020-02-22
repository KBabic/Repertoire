import React from 'react'
import { View, Alert } from 'react-native'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { styles } from './logInStyles'
import API from '../../API'

export default class LogIn extends React.Component {
   state = {
      email: "",
      password: "",
      eye: "eye-slash",
      secure: true,
      buttonDisabled: true,
      buttonColor: "#bbbec4"
   }
   async componentDidMount() {
      this.email = await API.getParam("email")
      this.password = await API.getParam("password")
   }
   handlePressEye = () => {
      if (this.state.eye === "eye") {
         this.setState({ eye: "eye-slash", secure: true })
      } else {
         this.setState({ eye: "eye", secure: false })
      }
   }
   onChangeParam = (param, txt) => {
      this.setState({ [param]: txt }, this.checkValidity)
   }
   checkValidity = () => {
      const { email, password } = this.state
      if (email !=="" && password !=="") {
         this.setState({ buttonDisabled: false, buttonColor: "#32A1F0" })
         return 
      }
      this.setState({ buttonDisabled: true, buttonColor: "#bbbec4"})
   }
   handleContinue = () => {
      const { buttonDisabled, email, password } = this.state
      if (!buttonDisabled && email === this.email && password === this.password) {
         this.props.navigation.navigate("Home")
      } else {
         Alert.alert("Error", "Your email or password is incorrect!", [{ title: "OK" }])
      }
   }
   render() {
      const { container } = styles
      return (
         <View style={container}>
            <Input 
               icon="envelope" 
               placeholder="Enter Your Email Address"
               onChange={(txt) => this.onChangeParam("email", txt)}
               value={this.state.email}
               ref="input1"
               onSubmit={() => this.refs.input2.focus()}
               blur={false}
            />
            <Input 
               icon="key" 
               icon2={this.state.eye} 
               placeholder="Enter Password"
               onPressEye={this.handlePressEye}
               secure={this.state.secure}
               onChange={(txt) => this.onChangeParam("password", txt)}
               value={this.state.pass1}
               ref="input2"
               blur={true}
            />
            <Button 
               text="Continue" 
               onPress={this.handleContinue}
               color={this.state.buttonColor}
               disabled={this.state.buttonDisabled}
            />
         </View>
      )
   }
}