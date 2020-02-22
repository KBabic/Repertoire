import AsyncStorage from '@react-native-community/async-storage'

class API {
   async getParam(key) {
      try {
         const param = await AsyncStorage.getItem(key)
         return param
      } catch(e) {
         console.log(e)
      }
   }
   async setParam(key, value) {
      try {
         await AsyncStorage.setItem(key, value)
      } catch(e) {
         console.log(e)
      }
   }
   async removeParam(key) {
      try {
         await AsyncStorage.removeItem(key)
      } catch(e) {
         console.log(e)
      }
   }
}

export default new API()