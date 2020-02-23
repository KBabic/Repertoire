import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './menuStyles'
import { genres } from '../../utils/utils'

const Menu = (props) => {
    const {
        innerContainer,
        listContainer,
        itemContainer,
        itemText
    } = styles
        
    return (
        <View style={innerContainer}>
            <View style={listContainer}>
                {genres.map((item) => {
                    return (
                        <TouchableOpacity 
                            key={item.id} 
                            style={[
                                itemContainer, 
                                {backgroundColor: 
                                // selected item or not?
                                item.id === props.currentItem ?
                                "#bbbec4" :
                                "#32A1F0"}
                            ]} 
                            onPress={() => props.onPressItem(item.id)}
                        >
                            <Text style={itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </View>
    )
}
export default Menu