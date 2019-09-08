<template>
  <div class="title">
    <div>
      <span>通常時の抽選</span>
    </div>
    <div>
      <button @click="onClickStart">{{buttonLabel}}</button>
    </div>
    <div v-show="isNext">
      <div><span>{{showLot}}</span></div>
      <div><span>{{showCost}}</span></div>
    </div>
  </div>
</template>
<script>
import utils from '@/utility/utils.js'
import BonusInfo from '@/dto/BonusInfo.js'
export default {
  name: 'NormalScreen',
  data () {
    return {
      bonusLabel: '',
      gameCount: 0,
      bonus: {},
      isNext: false
    }
  },
  computed: {
    showLot: function () {
      return `抽選結果:${this.bonusLabel} / ${this.gameCount}回抽選` 
    },
    showCost: function () {
      let costTama = this.$store.state.GameInfo.costTama
      let losecost = this.$store.state.GameInfo.loseCost
      return `消費魂：${costTama}  消費５００Ｐ：${losecost}`
    },
    buttonLabel: function () {
      if (this.isNext) {
        return '最終決戦へ遷移'
      } else {
        return '通常抽選を開始'
      }
    }
  },
  methods: {
    onClickStart: function() {
      // 次へ遷移する場合
      if (this.isNext) {
        // 最終決戦へ遷移
        this.$store.commit('saveScreenName', 2)
      } else {
        // 抽選を行う
        let resLot = utils.normalLot()
        // ボーナス情報を記録する
        let bonus = new BonusInfo(
          this.$store.getters.nextBonusIndex,
          resLot.count,
          resLot.id,
          resLot.label,
          0
        )
        this.gameCount = resLot.count
        this.bonusLabel = resLot.label
        console.log('first BonusInfo', bonus)
        this.isNext = true
        this.$store.commit('saveBonus', bonus)
        let payload = {
          type: bonus.type,
          mode: 1,
          count: bonus.count
        }
        // this.$store.commit('GameInfo/updateHisBonusType', payload)
        // ゲーム数をコストへ  costTama, loseCost
        this.$store.dispatch('GameInfo/playGame', payload)
      }
    }
  }
}
</script>