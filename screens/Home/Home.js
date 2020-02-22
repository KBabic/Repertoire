import React from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import ItemVertical from '../../components/ItemVertical/ItemVertical'
import ItemHorizontal from '../../components/ItemHorizontal/ItemHorizontal'
import { styles } from './homeStyles'
import API from '../../API'

export default class Home extends React.Component {
   state = {
      loading: true,
      nowPlaying: [],
      upcoming: []
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
   render() {
      const { container, title } = styles
      if (this.state.loading) {
         return (
            <View style={styles.container}>
               <ActivityIndicator size="large" />
            </View>
         )
      } else {
         return (
            <View style={container}>
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