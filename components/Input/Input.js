import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from './inputStyles'
/*
Input component accepts user's input (name, email, password).
Contains indicative icon on the left side, TextInput and optionally icon
on the right side for hiding/showing the password.
*/
export default Input = React.forwardRef((props, ref) => {
   const { container, iconContainer, input } = styles
   return (
      <View style={container}>
         <View style={iconContainer}>
            <Icon 
               type="font-awesome"
               name={props.icon}
               color="#0040C9"
            />
         </View>
         <TextInput
            ref={ref}
            placeholder={props.placeholder}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={props.blur}
            onChangeText={(txt) => props.onChange(txt)}
            onSubmitEditing={props.onSubmit}
            secureTextEntry={props.secure}
            value={props.value}
            style={input}
            returnKeyType="done"
         />
         {props.icon2 && (
            <TouchableOpacity 
               style={iconContainer} 
               onPress={props.onPressEye}
            >
               <Icon 
                  type="font-awesome"
                  name={props.icon2}
                  color="#bbbec4"
               />
            </TouchableOpacity>
         )}
      </View>
   )
})
Input.defaultProps = {
   secure: false
}