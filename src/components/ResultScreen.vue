<template>
  <div class="title">
    <div>
      <span>結果</span>
    </div>
    <div>
      <button @click="onClickStart">スタート画面へ戻る</button>
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
  mounted() {
    // メッセージを作成
    let history = this.$store.state.bonusHistory
    history.forEach(his => {
      let msg = `${his.index}回目 : ${his.label}`
      this.messages.push(msg)
    })
  },
  methods: {
    onClickStart: function() {
      // スタートへ戻る
      this.$store.commit('saveScreenName', 0)
    }
  }
}
</script>