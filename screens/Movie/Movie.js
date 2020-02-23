import React from 'react'
import { View, Text, Image, ScrollView, BackHandler } from 'react-native'
import { styles } from './movieStyles'
import Header from '../../components/Header/Header'
import API, { imageBaseUrl } from '../../API'

export default class Movie extends React.Component {
    state = {
        image: "",
        title: "",
        tagline: "",
        description: "",
        release_date: "",
        genres: [],
        popularity: null
    }
    async componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleAndroidBack)
        this._mounted = true
        this.id = await API.getParam("movieId")
        const movie = await API.getMovie(this.id)
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
        this.setState({
            image: obj.backdrop_path,
            title: obj.original_title,
            tagline: obj.tagline,
            description: obj.overview,
            release_date: obj.release_date,
            genres: this.getGenres(obj.genres),
            popularity: obj.popularity
        })
    }
    getGenres = arr => {
        return arr.map(el => {
            return el.name
        })
    }
    onLoadStart = () => {
        this._mounted && this.setState({ opacity: 1 })
    }
    onLoad = () => {
        this._mounted && this.setState({ opacity: 0 })
    }
    onBuffer = ({isBuffering}) => {
        this._mounted && this.setState({ opacity: isBuffering ? 1 : 0 })
    }
    render() {
        const { container, imageContainer, imageStyle, textContainer, textTitle, textTagline, textDescr, textTitleSmall } = styles
        const { image, title, tagline, description, release_date, popularity, genres } = this.state
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
                            source={{ uri: imageBaseUrl + image }}
                        />
                    </View>
                    <View style={textContainer}>
                        <Text style={textTitle}>{title}</Text>
                        <Text style={textTagline}>{tagline}</Text>
                        <Text style={textDescr}>{description}</Text>
                        <Text style={textTitleSmall}>{`Release date: ${release_date}`}</Text>
                        <Text style={textTitleSmall}>{`Popularity: ${popularity}`}</Text>
                        <Text style={textTitleSmall}>Genres:</Text>
                        {genres.map((el,i) => (
                            <Text key={i} style={textDescr}>{el}</Text>
                        ))}
                        
                    </View>   
                </ScrollView>
            </View>
        )
    }
}