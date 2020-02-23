import React from 'react'
import { View, Text, FlatList, ActivityIndicator, Animated, Dimensions, BackHandler } from 'react-native'
import ItemVertical from '../../components/ItemVertical/ItemVertical'
import ItemHorizontal from '../../components/ItemHorizontal/ItemHorizontal'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import { styles } from './homeStyles'
import API from '../../API'
import { filterByGenre } from '../../utils/utils'

const windowWidth = Dimensions.get('window').width

export default class Home extends React.Component {
   state = {
      loading: true,
      nowPlaying: [],
      pagePlaying: 1,
      upcoming: [],
      pageUpcoming: 1,
      menuOpen: false,
      currentGenre: 777,
      x: new Animated.Value(-windowWidth)
   }
   async componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", () => true)
      this.getNowPlaying(1) && this.getUpcoming(1) && this.setState({ loading: false })
   }
   componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", () => true)
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
   handleLoadMorePlaying = () => {
      this.getNowPlaying(this.state.pagePlaying + 1)
      this.setState(prevState => ({ pagePlaying: prevState.pagePlaying + 1 }))
   }
   handleLoadMoreUpcoming = () => {
      this.getUpcoming(this.state.pageUpcoming + 1)
      this.setState(prevState => ({ pageUpcoming: prevState.pageUpcoming + 1 }))
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
      const { id, backdrop_path, original_title, release_date } = item
      return (
         <ItemHorizontal
            key={id}
            source={backdrop_path}
            title={original_title}
            description={`Release date: ${release_date}`}
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
            duration: 250,
            useNativeDriver: true
         }).start(() => this.setState({ menuOpen: false }))
         
      } else {
         Animated.timing(this.state.x, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
         }).start(() => this.setState({ menuOpen: true }))
      }
   }
   clearLists = () => {
      this.setState({
         nowPlaying: [],
         upcoming: []
      })
   }
   resetSearch = async () => {
      this.clearLists()
      await this.getNowPlaying(1)
      await this.getUpcoming(1)
   }
   handlePressGenre = async (id) => {
      // if user pressed All or Favorites
      if (id === 777 /*|| id === 888*/){
         this.setState({ currentGenre: id })
         await this.resetSearch()
      // if user pressed one of the genres
      } else {
         this.setState({ currentGenre: id })
         await this.resetSearch()
         this.setState({ 
            // currentGenre: id,
            nowPlaying: filterByGenre(this.state.nowPlaying, id),
            upcoming: filterByGenre(this.state.upcoming, id)
         })
      }
   }
   render() {
      const { container, title, menu, list } = styles
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
                     extraData={this.state.upcoming}
                     renderItem={this.renderItemHorizontal}
                     keyExtractor={item => item.id.toString()}
                     horizontal={true}
                     onEndReached={this.handleLoadMoreUpcoming}
                     onEndReachedThreshold={0}
                  />
               </View>
               
               <Text style={title}>Now Playing</Text>
               <View>
                  <FlatList
                     data={this.state.nowPlaying}
                     extraData={this.state.nowPlaying}
                     renderItem={this.renderItemVertical}
                     keyExtractor={item => item.id.toString()}
                     onEndReached={this.handleLoadMorePlaying}
                     onEndReachedThreshold={0}
                     contentContainerStyle={list}
                  />
               </View>
            </View>
         )
      }
   }
}