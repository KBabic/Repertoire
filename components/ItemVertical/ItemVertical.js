import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { styles } from './itemVerticalStyles'
import { imageBaseUrl } from '../../API'
import { getShortText } from '../../utils/utils'

const ItemVertical = props => {
   const descr = getShortText(props.description, 80)
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
            <Text style={title}>{props.title}</Text>
            {descr && (
               <Text style={description}>{descr}</Text>
            )}
         </View>
      </TouchableOpacity>
   )
}
export default ItemVertical