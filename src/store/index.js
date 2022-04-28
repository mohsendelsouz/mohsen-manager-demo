import { createStore } from 'vuex'
import authModule from './modules/auth'
import reportModal from './modules/reportModal'

const store = createStore({
  state () {
    return {

    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
  },

  modules: {
    auth: authModule,
    report: reportModal,
  }
})

export default store