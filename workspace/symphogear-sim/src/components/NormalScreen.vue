<template>
  <div class="title">
    <div>
      <span>通常時の抽選</span>
    </div>
    <div>
      <button @click="onClickStart">START</button>
    </div>
    <div>
      <span>抽選値 </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NormalScreen',
  data () {
    return {
      lotteryValue: 0
    }
  },
  methods: {
    onClickStart: function() {
      let normalLot = Math.ceil(Math.random()*1998)
      this.lotteryValue = normalLot
    }
  }
}
</script>