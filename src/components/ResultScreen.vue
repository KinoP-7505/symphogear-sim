<template>
  <div class="title">
    <div>
      <span>結果</span>
    </div>
    <div>
      <button class="style-button" @click="onClickStart">スタート画面へ戻る</button>
      <button class="style-button" @click="onClickNext">まだ唄えるッ！頑張れる！</button>
    </div>    
    <div>
      <div v-for="msg in messages" :key="msg">{{msg}}</div>
    </div>
  </div>
</template>
<script>
// import utils from '@/utility/utils.js'
export default {
  name: 'ResultScreen',
  data () {
    return {
      messages: [] // 結果Messageを配列で
    }
  },
  mounted () {
    // メッセージを作成
    let history = this.$store.state.bonusHistory
    let hisCount = this.$store.state.bonusHistory.length
    history.forEach(his => {
      if (his.index === 1) {
        this.messages.push(`<<< 初当たり：${his.count} // ${his.label} >>>`)
        if (hisCount === 1) {
          this.messages.push('<<< 最終決戦敗北：わたしは勝機を零しました >>>')
        }
      } else if (his.index === 2) {
        this.messages.push(`<<< 最終決戦：${his.count}戦目勝利 // ${his.label} >>>`)
        this.messages.push('<<< シンフォギアチャンス突入 >>>')
      } else {
        let msg = `${his.index}唱目 : ${his.label}`
        this.messages.push(msg)
      }
    })
  },
  methods: {
    onClickStart: function() {
      // スタートへ戻る
      this.$store.commit('saveScreenName', 0)
    },
    onClickNext: function() {
      // ボーナス履歴を保存
      this.$store.commit('saveBonusHistory')
      // 通常画面へ遷移
      this.$store.commit('saveScreenName', 1)
    }
  }
}
</script>
<style  lang="scss" scoped>
.title {
  width: 100%;
  .style-button {
    margin: 1rem;
    // margin-right: 1rem;
    width: 13rem;
    height: 2rem;
  }
}
</style>
