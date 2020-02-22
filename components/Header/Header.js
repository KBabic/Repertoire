import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from './headerStyles'
import { getJustifyContent } from '../../utils/utils'
const Header = props => {
    const { header } = styles
    const justifyContent = getJustifyContent(props.leftIcon, props.rightIcon)
    return (
        <View style={[ header, { justifyContent }]}>
            {props.leftIcon && (
                <TouchableOpacity onPress={props.onPressLeftIcon}>
                    <Icon 
                        type="font-awesome"
                        name={props.leftIcon}
                        color="#0040C9"
                    />
                </TouchableOpacity>
            )}
            {props.rightIcon && (
                <TouchableOpacity 
                    onPress={props.onPressRightIcon}
                >
                    <Icon 
                        type="font-awesome"
                        name={props.rightIcon}
                        color="#0040C9"
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}
export default Header