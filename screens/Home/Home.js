import React from 'react'
import { View, Text, FlatList, ActivityIndicator, Animated, Dimensions } from 'react-native'
import ItemVertical from '../../components/ItemVertical/ItemVertical'
import ItemHorizontal from '../../components/ItemHorizontal/ItemHorizontal'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import { styles } from './homeStyles'
import API from '../../API'

const windowWidth = Dimensions.get('window').width

export default class Home extends React.Component {
   state = {
      loading: true,
      nowPlaying: [],
      upcoming: [],
      menuOpen: false,
      currentGenre: 777,
      x: new Animated.Value(-windowWidth)
   }
   async componentDidMount() {
      this.getNowPlaying(1) && this.getUpcoming(1) && this.setState({ loading: false })
   }
   async getNowPlaying(i) {
      const nowPlaying = await API.getList(API.getNowPlayingUrl(i))
      if (nowPlaying) {
         this.total = await nowPlaying[0]
         this.setState(prevState => 
            ({ nowPlaying: [...prevState.nowPlaying, ...nowPlaying[1] ]})
         )
         return true
      }
   }
   async getUpcoming(i) {
      const upcoming = await API.getList(API.getUpcomingUrl(i))
      if (upcoming) {
         this.total = await upcoming[0]
         this.setState(prevState => 
            ({ upcoming: [...prevState.upcoming, ...upcoming[1] ]})
         )
         return true
      }
   }
   renderItemVertical = ({ item }) => {
      const { id, backdrop_path, original_title, release_date } = item
      return (
         <ItemVertical
            key={id}
            source={backdrop_path}
            title={original_title}
            description={`Release date: ${release_date}`}
            onPress={() => this.handlePressItem(id)}
         />
      )
   }
   renderItemHorizontal = ({ item }) => {
      const { id, backdrop_path, original_title } = item
      return (
         <ItemHorizontal
            key={id}
            source={backdrop_path}
            title={original_title}
            onPress={() => this.handlePressItem(id)}
         />
      )
   }
   handlePressItem = async (id) => {
      await API.setParam("movieId", id.toString())
      this.props.navigation.navigate("Movie")
   }
   toggleMenu = () => {
      if (this.state.menuOpen) {
         Animated.timing(this.state.x, {
            toValue: -windowWidth,
            duration: 300
         }).start(() => this.setState({ menuOpen: false }))
         
      } else {
         Animated.timing(this.state.x, {
            toValue: 0,
            duration: 300
         }).start(() => this.setState({ menuOpen: true }))
      }
   }
   handlePressGenre = (id) => {
      this.setState({ currentGenre: id })
   }
   render() {
      const { container, title, menu } = styles
      if (this.state.loading) {
         return (
            <View style={styles.container}>
               <ActivityIndicator size="large" />
            </View>
         )
      } else {
         return (
            <View style={container}>
               <Header 
                  rightIcon="power-off"
                  leftIcon="bars"
                  onPressRightIcon={() => this.props.navigation.navigate("LogIn")}
                  onPressLeftIcon={this.toggleMenu}
               />
               <Animated.View  style={[menu, {transform: [{ translateX: this.state.x }] }]}>
                  <Menu 
                     onPressItem={this.handlePressGenre} 
                     currentItem={this.state.currentGenre}
                  />
               </Animated.View>
               <Text style={title}>Upcoming Movies</Text>
               <View>
                  <FlatList 
                     data={this.state.upcoming}
                     renderItem={this.renderItemHorizontal}
                     keyExtractor={item => item.id.toString()}
                     horizontal={true}
                  />
               </View>
               
               <Text style={title}>Now Playing</Text>
               <View>
                  <FlatList
                     data={this.state.nowPlaying}
                     renderItem={this.renderItemVertical}
                     keyExtractor={item => item.id.toString()}
                  />
               </View>
            </View>
         )
      }
   }
}