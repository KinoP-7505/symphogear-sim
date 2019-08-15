<template>
  <div class="title">
    <div>
      <span>通常時の抽選</span>
    </div>
    <div>
      <button @click="onClickStart">{{buttonLabel}}</button>
    </div>
    <div>
      <span>{{showLot}}</span>
    </div>
  </div>
</template>
<script>
import utils from '@/utility/utils.js'
export default {
  name: 'NormalScreen',
  data () {
    return {
      lotteryValue: 0,
      lotCount: 0,
      isNext: false
    }
  },
  computed: {
    showLot: function () {
      let label = utils.lose.label
      if (this.lotteryValue === utils.normal4R.id) {
        label = utils.normal4R.label
      } else if (this.lotteryValue === utils.normal15R.id) {
        label = utils.normal15R.label
      }
      return `抽選結果:${label} / ${this.lotCount}回抽選` 
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
        let execLot = utils.normalLot()
        this.lotteryValue = execLot.lotResult
        this.lotCount = execLot.count
        this.isNext = true
      }
    }
  }
}
</script>