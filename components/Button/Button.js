import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { styles } from './buttonStyles'

const Button = props => {
   const { button, buttonText } = styles
   return (
      <TouchableOpacity
         style={[button, {backgroundColor: props.color}]} 
         onPress={props.onPress}
         disabled={props.disabled}
      >
         <Text style={buttonText}>{props.text}</Text>
      </TouchableOpacity>
   )
}
Button.defaultProps = {
   disabled: false
}
export default Button