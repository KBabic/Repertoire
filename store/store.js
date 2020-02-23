import { observable, action } from 'mobx'
import AsyncStorage from '@react-native-community/async-storage'

class AppStore {
    @observable name = ""
    @observable email = ""
    @observable password = ""
    @observable movieId = null
    @action updateName = txt => this.name = txt
    @action updateEmail = txt => this.email = txt
    @action updatePassword = txt => this.password = txt
    @action updateMovieId = num => this.movieId = num
}
export default AppStore

export const storeItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch(e) {
        console.log(e)
    }
}
export const getItem = async (key) => {
    try {
        const item = await AsyncStorage.getItem(key)
        return item
    } catch(e) {
        console.log(e)
    }
}