import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    screenId: ''
  },
  mutations: {
    // 画面名を保存
    saveScreenName(state, screenId) {
      state.screenId = screenId
    }
  },
  actions: {
  }
})
