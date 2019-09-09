<template>
  <div class="title">
    <div>
      <span>Symphogear Simulator</span>
    </div>
    <div>
        <button @click="onClickStart">START</button>
    </div>    
    <div>
      <span>設定</span>
    </div>
    <div class="config-content">
      <table class="config-table">
        <tr>
          <th class="left-corumn">項目</th><th class="right-corumn">設定値</th>
        </tr>
        <tr>
          <th>１回転／玉数</th>
          <th>
            {{showCountTama}}
            <button @click="onClickConfig(1)">PUSH</button>
          </th>
        </tr>
        <tr>
          <th>ボーダー</th><th>{{showBoder}}</th>
        </tr>
        <tr>
          <th>遊戯玉数（500p）</th>
          <th>
            {{showRent}}
            <button @click="onClickConfig(2)">PUSH</button>
          </th>
        </tr>
        <tr>
          <th>レート（１玉）</th>
          <th>
            {{showChange}}
            <button @click="onClickConfig(3)">PUSH</button>
          </th>
        </tr>
      </table>
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
  computed: {
    showCountTama: function() {
      return `${this.$store.state.GameInfo.rotationNum}魂／回転`
    },
    showBoder: function() {
      let border = (this.$store.state.GameInfo.rentalRate * 2) / this.$store.state.GameInfo.rotationNum
      let retBorder = Math.round(border * 100) / 100
      return `${retBorder}回転／ｋ`
    },
    showRent: function() {
      return `${this.$store.state.GameInfo.rentalRate}玉／500p`
    },
    showChange: function() {
      return `${this.$store.state.GameInfo.salesRate}p／玉`
    }
  },
  methods: {
    onClickStart: function() {
      this.$store.commit('saveScreenName', 1)
    },
    onClickConfig: function(mode) {
      // if (mode === 1) {
      // }
      console.log('onClickConfig', mode)
    }
  }
}
</script>
<style  lang="scss" scoped>
.title {
  font-size: 16pt;
  width: 100%;
  .config-content {
    display: inline-block;
    vertical-align: top;
    width: 80%;
    .bonus-table {
      width: 100%;
      .left-corumn {
        width: 30%;
      }
      .right-corumn {
        width: 70%;
      }
    }
  }
}
</style>

