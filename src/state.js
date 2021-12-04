import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    isUserLoggedIn: false
  },
  mutations: {
    setLogin(state, response){
        state.isUserLoggedIn = response //gets the value of the login
    }
  }
})