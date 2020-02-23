import { observable, action } from 'mobx'

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