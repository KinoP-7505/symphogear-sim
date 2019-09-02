// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// import store from '@/store/store.js'

const GameInfo = {
  namespaced: true,
  state: {
    pow500: 0,  // 500円使用数
    soul: 0,  // 現在玉数
    rentalRate: 125,  // 500円の貸出玉数
    salesRate: 4,  // 1玉の交換レート
    rotationNum: 13,  // １回転に必要な玉数
    costTama: 0,  // 消費玉
    loseCost: 0,  // 支払コスト
    hisBonus: {
      normal4R: 0,
      normal15R: 0,
      right4R: 0,
      right8R: 0,
      right12R: 0,
      right15R: 0,
    }
  },
  mutations: {
    // 現在玉数を更新
    updateSoul(state, value) {
      state.soul = value
    },
    updatePow500(state, value) {
      state.pow500 = value
    },
    // ボーナス種別出現数をカウント
    updateHisBonusType(state, value) {
      if (value === 1) {
        // 右打ち４Ｒ
        ++state.hisBonus.right4R
      } else if (value === 2) {
        // 右打ち８Ｒ
        ++state.hisBonus.right8R
      } else if (value === 3) {
        // 右打ち１２Ｒ
        ++state.hisBonus.right12R
      } else if (value === 4) {
        // 右打ち１５Ｒ
        ++state.hisBonus.right15R
      } else if (value === 5) {
        // 通常４Ｒ
        ++state.hisBonus.normal4R
      } else if (value === 6) {
        // 通常１５Ｒ
        ++state.hisBonus.normal15R
      }
    },
    workValue(state, retValue) {
      state.costTama = retValue.costTama
      state.loseCost = retValue.loseCost
    },
  },
  actions: {
    // 回転数分、魂を減らす
    // gameCount: 回転数
    playGame({state, commit}, gameCount) {
      // 減算魂 = 回転数 * 玉数/１回転
      let costTama = gameCount * state.rotationNum
      // 残玉
      let workTama = state.soul - costTama
      // 使用500円
      let workCost = 0
      if (workTama < 0) {
        // 残玉を正数にする
        workTama = workTama * -1
        // 使用500円
        workCost = Math.floor(workTama / state.rentalRate)
        // 不足玉
        let zanTama = workTama % state.rentalRate
        if (zanTama === 0) {
          // 500円を更新
          let value = state.pow500 + workCost
          commit('updatePow500', value)
        } else {
          // 現在玉数を更新
          let valueTama = state.soul + state.rentalRate - zanTama
          commit('updateSoul', valueTama)
          // 500円を更新
          let value500 = state.pow500 + workCost + 1
          commit('updatePow500', value500)
        }
      } else {
        // 現在玉数を設定
        commit('updateSoul', workCost)
      }
      // 返却
      let retValue = {
        costTama: costTama,
        loseCost: workCost
      }
      commit('workValue', retValue)
    }
  }
}
export default GameInfo