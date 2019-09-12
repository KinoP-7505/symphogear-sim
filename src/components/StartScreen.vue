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
          <td>１回転／玉数</td>
          <td>
            {{showCountTama}}
            <button @click="onClickConfig(1)">PUSH</button>
          </td>
        </tr>
        <tr>
          <td>ボーダー</td><td>{{showBoder}}</td>
        </tr>
        <tr>
          <td>遊戯玉数（500p）</td>
          <td>
            {{showRent}}
            <button @click="onClickConfig(2)">PUSH</button>
          </td>
        </tr>
        <tr>
          <td>レート（１玉）</td>
          <td>
            {{showChange}}
            <button @click="onClickConfig(3)">PUSH</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- コンポーネント MyModal -->
    <ModalInput v-if="showModalConfig1" @close="closeModalConfig1()"></ModalInput>
  </div>
</template>
<script>
import ModalInput from '@/components/Modal/ModalInputNumber.vue'

export default {
  name: 'StartScreen',
  data () {
    return {
      showModalConfig1: false
    }
  },
  components: {
    ModalInput
  },

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
      // ボーダー設定
      if (mode === 1) {
        this.showModalConfig1 = true
      }
      console.log('onClickConfig', mode)
    },
    closeModalConfig1: function() {
      console.log('Home closeModal')
      this.showModalConfig1 = false
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
    .config-table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      table-layout: fixed;
      th {
        border: 1px solid #666;
        background-color: #4f4f4f;
        color: #FFF;
      }
      .left-corumn {
        width: 50%;
      }
      .right-corumn {
        width: 50%;
      }
      td{
        text-align: center;
        padding: 5px 0;
        border-right:solid 1px #ddd;
        border-left:solid 1px #ddd;
        width: 155px;
      }      
    }
  }
}
</style>

