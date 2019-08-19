<template>
  <div class="title">
    <div>
      <span>Symphogear Simulator</span>
    </div>
    <div>
        <button @click="onClickStart">START</button>
    </div>    
  </div>
</template>
<script>
export default {
  name: 'StartScreen',
  mounted () {
    // stateの初期化
    this.$store.commit('initState')
  },
  methods: {
    onClickStart: function() {
      this.$store.commit('saveScreenName', 1)
    }
  }
}
</script>

