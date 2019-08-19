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
      lotteryLabel: '',
      lotCount: 0,
      isNext: false
    }
  },
  computed: {
    showLot: function () {
      return `抽選結果:${this.lotteryLabel} / ${this.lotCount}回抽選` 
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
        this.lotteryLabel = resLot.label
        this.lotCount = resLot.count
        this.isNext = true
      }
    }
  }
}
</script>