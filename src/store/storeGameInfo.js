// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)
// import store from '@/store/store.js'
import utils from '@/utility/utils.js'

const GameInfo = {
  namespaced: true,
  state: {
    pow500: 0,  // 500円使用数
    soul: 0,  // 現在玉数
    rentalRate: 125,  // 500円の貸出玉数
    salesRate: 4,  // 1玉の交換レート
    rotationNum: 12,  // １回転に必要な玉数
    costTama: 0,  // 消費玉
    loseCost: 0,  // 支払コスト
    hisBonus: {
      normal4R: 0,
      normal15R: 0,
      right4R: 0,
      right8R: 0,
      right12R: 0,
      right15R: 0,
      firstBonus: 0,
      firstBonusCount: 0,
      winLastBattle: 0,
      lastBattleCount: 0,
      winSC: 0,
      scCount: 0,
      total: 0
    }
  },
  mutations: {
    // 現在玉数を更新
    updateSoul(state, value) {
      console.log('updateSoul', value)
      state.soul = value
    },
    updatePow500(state, value) {
      console.log('updatePow500', value)
      state.pow500 = value
    },
    updatefirstBonus(state, value) {
      if (value === 1) {
        ++state.firstBonus
      } else if (value === 2) {
        ++state.lastBattleWin
      }
    },
    // ボーナス種別出現数をカウント
    updateHisBonusType(state, payload) {
      let type = payload.type
      let mode = payload.mode
      let count = payload.count

      if (type === 1) {
        // 右打ち４Ｒ
        ++state.hisBonus.right4R
      } else if (type === 2) {
        // 右打ち８Ｒ
        ++state.hisBonus.right8R
      } else if (type === 3) {
        // 右打ち１２Ｒ
        ++state.hisBonus.right12R
      } else if (type === 4) {
        // 右打ち１５Ｒ
        ++state.hisBonus.right15R
      } else if (type === 5) {
        // 通常４Ｒ
        ++state.hisBonus.normal4R
      } else if (type === 6) {
        // 通常１５Ｒ
        ++state.hisBonus.normal15R
      }
      // ハズレ以外の場合、total数増加
      if (type !== 0) {
        state.hisBonus.total += 1
      }

      // 累積数カウント
      if (mode === 1) {
        ++state.hisBonus.firstBonus
        state.hisBonus.firstBonusCount += count
      } else if (mode === 2) {
        // 最終決戦 勝利
        ++state.hisBonus.winLastBattle
        state.hisBonus.lastBattleCount += count
      } else if (mode === 3) {
        // 最終決戦 敗北
        state.hisBonus.lastBattleCount += count
      } else if (mode === 4) {
        // ＳＣ 勝利
        ++state.hisBonus.winSC
        state.hisBonus.scCount += count
      } else if (mode === 5) {
        // ＳＣ 敗北
        state.hisBonus.scCount += count
      }        
    },
    // 累積情報を更新
    workValue(state, values) {
      state.costTama = values[0]
      state.loseCost = values[1]
    },
  },
  actions: {
    // 回転数分、魂を減らす
    // gameCount: 回転数
    playGame({state, commit}, payload) {
      let gameCount = payload.count
      let getTama = utils.bonusTypes[payload.type].tama
      let mode = payload.mode
      let workTama = 0
      let updateTama = 0
      console.log('payload.index', payload.type)
      console.log('getTama', getTama)
      if (mode === 1) {
        // 減算魂 = 回転数 * 玉数/１回転
        let costTama = gameCount * state.rotationNum
        // 残玉
        workTama = state.soul - costTama
        let workCost = 0
        if (workTama < 0) {
          // 残玉を正数にする
          workTama = workTama * -1
          // 使用500円
          let workCost = Math.floor(workTama / state.rentalRate)
          // 不足玉
          let zanTama = workTama % state.rentalRate
          // 更新玉
          updateTama = getTama
          if (zanTama !== 0) {
            updateTama += (state.rentalRate - zanTama)
            workCost += 1
          }
          // 500円を更新
          commit('updatePow500', (state.pow500 + workCost))
        } else {
          // 現在玉数を設定
          updateTama = workTama + getTama
        }
        // 今回情報を更新
        commit('workValue', [ costTama, workCost ])
      } else {
        // 初回以降の集計
        updateTama = state.soul + getTama
      }
      // 現在玉数を設定
      commit('updateSoul', updateTama)
      // ボーナス種別出現数をカウント
      commit('updateHisBonusType', payload)
    }
  }
}
export default GameInfo