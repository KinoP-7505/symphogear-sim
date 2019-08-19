import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utility/utils.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 画面状態
    screenId: '',  
    // 抽選結果をリスト格納する。抽選中＋保留で最大5要素
    lotStock: [],
    // 当選情報  bounusInfo配列
    bonusHistory: []
  },
  getters: {
    // 保留リストの0番を返す
    oneStock(state) {
      if (state.lotStock.length > 0) {
        return state.lotStock[0]
      } 
    },
    nextBonusIndex(state) {
      return state.bonusHistory.length + 1
    },
    numVStock(state) {
      let num = 0
      for (let i = 1; i < state.lotStock.length; i++) {
        // 保留１～４が当選の場合
        // console.log('numVStock', `i=${i} // id = ${state.lotStock[i].id}`)
        if (state.lotStock[i].id > 0) {
          // 出現数をカウント
          ++num
        }
      }
      // ストック数を返す
      return num
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
    },
    // lotStcokの先頭を削除する
    shiftLot(state) {
      state.lotStock.shift()
    },
    saveVStock(state) {
      state.lotStock.forEach(lot => {
        if(lot.id > 0) {
          lot.vStock = true
        }
      })
    },
    saveBonus(state, bonus) {
      state.bonusHistory.push(bonus)
    }
  },
  actions: {
    lotStock({state, commit}) {
      // 5要素までstockする
      while (state.lotStock.length < 5) {
        // 抽選する
        let result = utils.randamLot()
       
        // 結果をPushコミットする
        commit('pushLot', result)
      }
      console.log('lotStock length', state.lotStock.length)
    }
  }
})
