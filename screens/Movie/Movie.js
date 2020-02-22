import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './movieStyles'
import API from '../../API'

export default class Movie extends React.Component {
    async componentDidMount() {
        this.id = await API.getParam("movieId")
        const movie = await API.getMovie(this.id)
        console.log(movie)
    }
    render() {
        return (
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
                <Text>Movie Screen</Text>
            </View>
        )
    }
}