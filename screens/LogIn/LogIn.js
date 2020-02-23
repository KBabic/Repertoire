import React from 'react'
import { View, Alert } from 'react-native'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { styles } from './logInStyles'
import API from '../../API'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class LogIn extends React.Component {

   @observable email = ""
   @observable password = ""
   @observable eye = "eye-slash"
   @observable secure = true
   @observable buttonDisabled = true
   @observable buttonColor = "#bbbec4"

   async componentDidMount() {
      this.storedEmail = await API.getParam("email")
      this.storedPassword = await API.getParam("password")
   }
   handlePressEye = () => {
      if (this.eye === "eye") {
         this.eye = "eye-slash"
         this.secure = true
      } else {
         this.eye = "eye"
         this.secure = false
      }
   }
   checkValidity = () => {
      if (this.email !== "" && this.password !== "") {
         this.buttonDisabled = false
         this.buttonColor = "#32A1F0"
      } else {
         this.buttonDisabled = true
         this.buttonColor = "#bbbec4"
      }
   }
   handleContinue = () => {
      if (
         !this.buttonDisabled && 
         this.email === this.storedEmail &&
         this.password === this.storedPassword
      ) {
         this.email = ""
         this.password = ""
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
               onChange={(txt) => this.email = txt}
               value={this.email}
               ref="input1"
               onSubmit={() => this.refs.input2.focus()}
               blur={false}
            />
            <Input 
               icon="key" 
               icon2={this.eye}
               placeholder="Enter Password"
               onPressEye={this.handlePressEye}
               secure={this.secure}
               onChange={(txt) => this.password = txt}
               onSubmit={() => this.checkValidity()}
               value={this.password}
               ref="input2"
               blur={true}
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
export default LogIn