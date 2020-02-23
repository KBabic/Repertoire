import NetInfo from '@react-native-community/netinfo'
import { Alert } from 'react-native'

const key = "abc6a48be0890b61348f501de8013f9c"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmM2YTQ4YmUwODkwYjYxMzQ4ZjUwMWRlODAxM2Y5YyIsInN1YiI6IjVlNTAxZDQzYTc2YWM1MDAxMWEwMjFjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mHNBbKOUF2FtrEl3G1uU9trb2FiS1LpVe2Pwq0DRBnQ"
const baseUrl = "https://api.themoviedb.org/3/movie/"
export const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

const headers = {
   "Accept": "application/json",
   "Access-Token": "Bearer" + token
}
const checkInternetConnection = async () => {
   NetInfo.fetch().then(state => {
      !state.isConnected && alertNetworkError()
      return state.isConnected && true
   })
}
const alertNetworkError = () => {
   Alert.alert("Error", "Please check your internet connection!", [{ title: "OK"}])
   return false
}
const alertError = () => {
   Alert.alert("Error", "Unknown error happened, please try later.", [{ title: "OK" }])
}

class API {
   
   getNowPlayingUrl = (i) => `${baseUrl}now_playing?api_key=${key}&language=en-US&page=${i}&region=DE`
   getUpcomingUrl = (i) => `${baseUrl}upcoming?api_key=${key}&language=en-US&page=${i}&region=DE`
   
   async getList(url) {
      if (checkInternetConnection()) {
         try {
            let response = await fetch(url, {
               method: "GET",
               headers
            })
            let res = await response.json()
            /* result looks like this:
            res = { 
               page: 1, 
               results: [
                  { id, release_date, backdrop_path, title, ...}, {...}, {...}
               ],
               date: {...},
               total_pages: 33, 
               total_results: 649 
            }
            */
            const total_pages = res.total_pages
            const results = res.results
            return [total_pages, results]
         } catch(e) {
            console.log(e)
            alertError()
         }
      }
   }
   
   async getMovie(id) {
      if (checkInternetConnection()) {
         try {
            let response = await fetch(
               `${baseUrl}${id}?api_key=${key}&language=en-US`,
               {
                  method: "GET",
                  headers
               }
            )
            let res = await response.json()
            /*
            result looks like this:
            res = {
               adult: false,
               backdrop_path: "...,"
               genres: [...],
               id: 454626,
               original_title: "...",
               release_date: "..."
               ...
            }
            */
            return res
         } catch(e) {
            console.log(e)
            alertError()
         }
      }
   }

   async getVideo(id) {
      if (checkInternetConnection()) {
         try {
            let response = await fetch(
               `${baseUrl}${id}/videos?api_key=${key}&language=en-US`, {
                  method: "GET",
                  headers
               }
            )
            let res = await response.json()
            if (res.results[0]) {
               return "https://www.youtube.com/watch?v=" +  res.results[0].key
            }
         } catch(e) {
            console.log(e)
            alertError()
         }
      }
   }
}

export default new API()