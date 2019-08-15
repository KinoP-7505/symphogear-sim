import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utility/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 画面状態
    screenId: '',  
    // 抽選結果をリスト格納する。抽選中＋保留で最大5要素
    lotStock: []
  },
  getters: {
    // 保留リストの0番を返す
    getOneStrock(state) {
      if (state.lotStock.length > 0) {
        return state.lotStock[0]
      } 
    }
  },
  mutations: {
    // 画面名を保存
    saveScreenName(state, screenId) {
      state.screenId = screenId
    },
    pushLot(state, result) {
      state.lotStock.push(result)
    },
    setLot(state, ary) {
      state.lotStock = ary
    }
  },
  actions: {
    // lotStcokの先頭を削除する
    shiftLot({state, commit}) {
      let ary = state.lotStock.shift()
      commit('setLot', ary)
    },
    lotStock({state, commit}) {
      // 5要素までstockする
      while (state.lotStock.length < 5) {
        // 抽選する
        let res = utils.randamLot()
       
        // 結果をPushコミットする
        commit('pushLot', res.result)
      }
    }
  }
})
