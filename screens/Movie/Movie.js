import React from 'react'
import { View, Text, Image, ScrollView, BackHandler } from 'react-native'
import { WebView } from 'react-native-webview'
import { styles } from './movieStyles'
import Header from '../../components/Header/Header'
import API, { imageBaseUrl } from '../../API'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

@inject("store")
@observer
class Movie extends React.Component {
   
    @observable image = ""
    @observable title = ""
    @observable tagline = ""
    @observable description = []
    @observable release_date = ""
    @observable genres = []
    @observable popularity = null
    @observable video = ""

    async componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleAndroidBack)
        this._mounted = true
        const movie = await API.getMovie(this.props.store.movieId)
        this.video = await API.getVideo(this.props.store.movieId)
        movie && this.updateState(movie)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleAndroidBack)
        this._mounted = false
    }
    handleAndroidBack = () => {
        this.props.navigation.goBack()
        return true
    }
    updateState = (obj) => {
        this.image = obj.backdrop_path
        this.title = obj.original_title
        this.tagline = obj.tagline
        this.description = obj.overview
        this.release_date = obj.release_date
        this.genres = this.getGenres(obj.genres)
        this.popularity = obj.popularity
    }
    getGenres = arr => {
        return arr.map(el => {
            return el.name
        })
    }
    render() {
        const { 
            container, 
            imageContainer, 
            imageStyle, 
            textContainer, 
            textTitle, 
            textTagline, 
            textDescr, 
            textTitleSmall,
            videoStyle
        } = styles
        return (
            <View style={container}>
                <Header
                    leftIcon="chevron-left"
                    onPressLeftIcon={() => this.props.navigation.goBack()}
                />
                <ScrollView>
                    <View style={imageContainer}>
                        <Image 
                            style={imageStyle}
                            source={{ uri: imageBaseUrl + this.image }}
                        />
                    </View>
                    <View style={textContainer}>
                        <Text style={textTitle}>{this.title}</Text>
                        <Text style={textTagline}>{this.tagline}</Text>
                        <Text style={textDescr}>{this.description}</Text>
                        <Text style={textTitleSmall}>{`Release date: ${this.release_date}`}</Text>
                        <Text style={textTitleSmall}>{`Popularity: ${this.popularity}`}</Text>
                        <Text style={textTitleSmall}>Genres:</Text>
                        {this.genres.map((el,i) => (
                            <Text key={i} style={textDescr}>{el}</Text>
                        ))}
                    </View>
                    {this.video !== "" && (
                        <WebView 
                            style={videoStyle}
                            javaScriptEnabled={true}
                            source={{ uri: this.video }}
                        />
                    )}
                </ScrollView>
            </View>
        )
    }
}
export default Movie