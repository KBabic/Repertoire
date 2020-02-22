import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { styles } from './itemHorizontalStyles'
import { imageBaseUrl } from '../../API'
import { getShortText } from '../../utils/utils'

const ItemHorizontal = props => {
   const descr = getShortText(props.description, 80)
   const displayTitle = getShortText(props.title, 20)
   const uri = imageBaseUrl + props.source
   
   const { 
      container, 
      imageContainer, 
      image, 
      textContainer, 
      title, 
      description 
   } = styles
   
   return (
      <TouchableOpacity style={container} onPress={props.onPress}>
         <View style={imageContainer}>
            <Image source={{ uri }} style={image} />
         </View>
         <View style={textContainer}>
            <Text style={title}>{displayTitle}</Text>
            {descr && (
               <Text style={description}>{descr}</Text>
            )}
         </View>
      </TouchableOpacity>
   )
}
export default ItemHorizontal