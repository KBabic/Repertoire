import React from 'react'
import { View } from 'react-native'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { styles } from './signUpStyles'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("store")
@observer
class SignUp extends React.Component {

   @observable name = ""
   @observable email = ""
   @observable pass1 = ""
   @observable pass2 = ""
   @observable eye1 = "eye-slash"
   @observable eye2 = "eye-slash"
   @observable secure1 = true
   @observable secure2 = true
   @observable buttonDisabled = true
   @observable buttonColor = "#bbbec4"
   handlePressEye1 = () => {
      if (this.eye1 === "eye") {
         this.eye1 = "eye-slash"
         this.secure1 = true
      } else {
         this.eye1 = "eye"
         this.secure1 = false
      }
   }
   handlePressEye2 = () => {
      if (this.eye2 === "eye") {
         this.eye2 = "eye-slash"
         this.secure2 = true
      } else {
         this.eye2 = "eye"
         this.secure2 = false
      }
   }
   checkValidity = () => {
      if (this.name !== "" && this.email !== "" && this.pass1 !== ""
      && this.pass2 !== "" && this.pass1 === this.pass2) {
         this.buttonDisabled = false
         this.buttonColor = "#32A1F0"
      } else {
         this.buttonDisabled = true
         this.buttonColor = "#bbbec4"
      }
   }
   handleContinue = async () => {
      if (!this.buttonDisabled) {
         this.props.store.updateName(this.name)
         this.props.store.updateEmail(this.email)
         this.props.store.updatePassword(this.pass2)
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
               onChange={txt => this.name = txt}
               value={this.name}
               ref="input1"
               onSubmit={() => this.refs.input2.focus()}
               blur={false}
            />
            <Input 
               icon="envelope" 
               placeholder="Enter Your Email Address"
               onChange={txt => this.email = txt}
               value={this.email}
               ref="input2"
               onSubmit={() => this.refs.input3.focus()}
               blur={false}
            />
            <Input 
               icon="key" 
               icon2={this.eye1}
               placeholder="Enter Password"
               onPressEye={this.handlePressEye1}
               secure={this.secure1}
               onChange={txt => this.pass1 = txt}
               value={this.pass1}
               ref="input3"
               onSubmit={() => this.refs.input4.focus()}
               blur={false}
            />
            <Input 
               icon="key" 
               icon2={this.eye2}
               placeholder="Repeat Password"
               onPressEye={this.handlePressEye2}
               secure={this.secure2}
               onChange={txt => this.pass2 = txt}
               value={this.pass2}
               ref="input4"
               blur={true}
               onSubmit={this.checkValidity}
            />
            <Button 
               text="Continue" 
               onPress={this.handleContinue}
               color={this.buttonColor}
               disabled={this.buttonDisabled}
            />
         </View>
      )
   }
}
export default SignUp