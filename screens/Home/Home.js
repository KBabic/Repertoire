import React from 'react'
import { View, Text, FlatList, ActivityIndicator, Animated, Dimensions, BackHandler } from 'react-native'
import ItemVertical from '../../components/ItemVertical/ItemVertical'
import ItemHorizontal from '../../components/ItemHorizontal/ItemHorizontal'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import { styles } from './homeStyles'
import API from '../../API'
import { filterByGenre } from '../../utils/utils'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

const windowWidth = Dimensions.get('window').width

@inject("store")
@observer
class Home extends React.Component {
   
   @observable loading = true
   @observable nowPlaying = []
   @observable pagePlaying = 1
   @observable upcoming = []
   @observable pageUpcoming = 1
   @observable menuOpen = false
   @observable currentGenre = 777
   @observable x = new Animated.Value(-windowWidth)

   async componentDidMount() {
      BackHandler.addEventListener("hardwareBackPress", () => true)
         await this.getNowPlaying(1)
         await this.getUpcoming(1)
         this.loading = false
   }
   componentWillUnmount() {
      BackHandler.removeEventListener("hardwareBackPress", () => true)
   }
   async getNowPlaying(i) {
      const nowPlaying = await API.getList(API.getNowPlayingUrl(i))
      if (nowPlaying) {
         this.nowPlaying = [...this.nowPlaying, ...nowPlaying[1]]
      }
   }
   async getUpcoming(i) {
      const upcoming = await API.getList(API.getUpcomingUrl(i))
      if (upcoming) {
         this.total = await upcoming[0]
         this.upcoming = [...this.upcoming, ...upcoming[1]]
      }
   }
   handleLoadMorePlaying = () => {
      this.getNowPlaying(this.pagePlaying + 1)
      this.pagePlaying++
   }
   handleLoadMoreUpcoming = () => {
      this.getUpcoming(this.pageUpcoming + 1)
      this.pageUpcoming++
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
      this.props.store.updateMovieId(id)
      this.props.navigation.navigate("Movie")
   }
   toggleMenu = () => {
      if (this.menuOpen) {
         Animated.timing(this.x, {
            toValue: -windowWidth,
            duration: 250,
            useNativeDriver: true
         }).start(() => this.menuOpen = false)
         
      } else {
         Animated.timing(this.x, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true
         }).start(() => this.menuOpen = true)
      }
   }
   clearLists = () => {
      this.nowPlaying = []
      this.upcoming = []
   }
   resetSearch = async () => {
      this.clearLists()
      await this.getNowPlaying(1)
      await this.getUpcoming(1)
   }
   handlePressGenre = async (id) => {
      // if user pressed All or Favorites
      if (id === 777 /*|| id === 888*/){
         this.currentGenre = id
         await this.resetSearch()
      // if user pressed one of the genres
      } else {
         this.currentGenre = id
         await this.resetSearch()
         this.nowPlaying = filterByGenre(this.nowPlaying, id)
         this.upcoming = filterByGenre(this.upcoming, id)
      }
   }
   render() {
      const { container, spinner, title, menu, list } = styles
      if (this.loading) {
         return (
            <View style={spinner}>
               <ActivityIndicator size="large" color="#0040C9" />
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
               <Animated.View  style={[menu, {transform: [{ translateX: this.x }] }]}>
                  <Menu 
                     onPressItem={this.handlePressGenre} 
                     currentItem={this.currentGenre}
                  />
               </Animated.View>
               <Text style={title}>Upcoming Movies</Text>
               <View>
                  <FlatList 
                     data={this.upcoming}
                     extraData={this.upcoming}
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
                     data={this.nowPlaying}
                     extraData={this.nowPlaying}
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
export default Home