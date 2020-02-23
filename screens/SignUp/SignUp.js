import React from 'react'
import { View } from 'react-native'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { styles } from './signUpStyles'
import API from '../../API'

export default class SignUp extends React.Component {
   state = {
      name: "",
      email: "",
      pass1: "",
      pass2: "",
      eye1: "eye-slash",
      eye2: "eye-slash",
      secure1: true,
      secure2: true,
      buttonDisabled: true,
      buttonColor: "#bbbec4"
   }
   handlePressEye = (eye, secure) => {
      if (this.state[eye] === "eye") {
         this.setState({ [eye]: "eye-slash", [secure]: true })
      } else {
         this.setState({ [eye]: "eye", [secure]: false })
      }
   }
   onChangeParam = (param, txt) => {
      this.setState({ [param]: txt }, this.checkValidity)
   }
   checkValidity = () => {
      const { name, email, pass1, pass2 } = this.state
      if (name !=="" && email !=="" && pass1 !=="" && pass2 !=="" && pass1 === pass2) {
         this.setState({ buttonDisabled: false, buttonColor: "#32A1F0" })
         return 
      }
      this.setState({ buttonDisabled: true, buttonColor: "#bbbec4"})
   }
   handleContinue = async () => {
      const { name, email, pass2, buttonDisabled } = this.state
      if (!buttonDisabled) {
         await API.setParam("name", name)
         await API.setParam("email", email)
         await API.setParam("password", pass2)

         this.props.navigation.navigate("Home")
      }
   }  
   render() {
      const { container } = styles
      return (
         <View style={container}>
            <Input 
               icon="user-circle" 
               placeholder="Enter Full Name"
               onChange={(txt) => this.onChangeParam("name", txt)}
               value={this.state.name}
               ref="input1"
               onSubmit={() => this.refs.input2.focus()}
               blur={false}
            />
            <Input 
               icon="envelope" 
               placeholder="Enter Your Email Address"
               onChange={(txt) => this.onChangeParam("email", txt)}
               value={this.state.email}
               ref="input2"
               onSubmit={() => this.refs.input3.focus()}
               blur={false}
            />
            <Input 
               icon="key" 
               icon2={this.state.eye1} 
               placeholder="Enter Password"
               onPressEye={() => this.handlePressEye("eye1", "secure1")}
               secure={this.state.secure1}
               onChange={(txt) => this.onChangeParam("pass1", txt)}
               value={this.state.pass1}
               ref="input3"
               onSubmit={() => this.refs.input4.focus()}
               blur={false}
            />
            <Input 
               icon="key" 
               icon2={this.state.eye2} 
               placeholder="Repeat Password"
               onPressEye={() => this.handlePressEye("eye2", "secure2")}
               secure={this.state.secure2}
               onChange={(txt) => this.onChangeParam("pass2", txt)}
               value={this.state.pass2}
               ref="input4"
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