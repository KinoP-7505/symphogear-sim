<template>
  <div class="home">
    <!-- 左画面 -->
    <div class="content-left">
      <StartScreen v-if="showStart"/>
      <NormalScreen v-if="showNormal"/>
      <LastBattle v-if="showLastBattle"/>
      <SChance v-if="showSChance"/>
      <ResultScreen v-if="showResult"/>
      <p>ボタンを押すとモーダルウィンドウが開きます</p>
      <button @click="showModal = true">開く</button>
    </div>
    <!-- 右画面 -->
    <div class="content-right">
      <!-- 消費ユキチ -->
      <div class="yukiti">
        DEATH YUKICHI
      </div>
      <div class="yukiti">
        {{showPow500}}
      </div>
      <!-- 現在玉 -->
      <div class="yukiti">
        魂
      </div>
      <div class="tamashi">
        {{showTama}}
      </div>
      <!-- 出現ボーナス -->
      <div class="bonus">
        <table class="bonus-table">
          <tr>
            <th class="left-corumn">ボーナス</th><th class="right-corumn">回数</th>
          </tr>
          <tr>
            <th>絶唱</th><th>{{$store.state.GameInfo.hisBonus.total}}</th>
          </tr>
          <tr>
            <th>通常４Ｒ</th><th>{{$store.state.GameInfo.hisBonus.normal4R}}</th>
          </tr>
          <tr>
            <th>通常１５Ｒ</th><th>{{$store.state.GameInfo.hisBonus.normal15R}}</th>
          </tr>
          <tr>
            <th>右打４Ｒ</th><th>{{$store.state.GameInfo.hisBonus.right4R}}</th>
          </tr>
          <tr>
            <th>右打８Ｒ</th><th>{{$store.state.GameInfo.hisBonus.right8R}}</th>
          </tr>
          <tr>
            <th>右打１２Ｒ</th><th>{{$store.state.GameInfo.hisBonus.right12R}}</th>
          </tr>
          <tr>
            <th>右打１５Ｒ</th><th>{{$store.state.GameInfo.hisBonus.right15R}}</th>
          </tr>
        </table>
      </div>
    </div>


    <!-- コンポーネント MyModal -->
    <ModalInput v-if="showModal" @close="closeModal()"></ModalInput>
  </div>
</template>

<script>
// @ is an alias to /src
import StartScreen from '@/components/StartScreen.vue'
import NormalScreen from '@/components/NormalScreen.vue'
import LastBattle from '@/components/LastBattle.vue'
import SChance from '@/components/SChance.vue'
import ResultScreen from '@/components/ResultScreen.vue'

import ModalInput from '@/components/Modal/ModalInputNumber.vue'

export default {
  name: 'home',
  data () {
    return {
      showStart: true,
      showNormal: false,
      showLastBattle: false,
      showSChance: false,
      showResult: false,
      showModal: false
    }
  },
  components: {
    StartScreen,
    NormalScreen,
    LastBattle,
    SChance,
    ResultScreen,
    ModalInput
  },
  mounted () {
    this.showStart = true
    this.showNormal = false
    this.showLastBattle = false
    this.showResult = false
    this.showModal = false
  },
  computed: {
    // Storeを監視
    nowScreenId: function () {
      return this.$store.state.screenId
    },
    showPow500: function () {
      return this.$store.state.GameInfo.pow500
    },
    showTama: function () {
      return this.$store.state.GameInfo.soul
    }
  },
  watch: {
    // Store.screenIdが変更された場合、画面表示を切り替える
    nowScreenId: function (id) {
      switch (id) {
        case 0:
          this.showStart = true
          this.showNormal = false
          this.showLastBattle = false
          this.showResult = false
          break
        case 1:
          this.showStart = false
          this.showNormal = true
          this.showResult = false
          break
        case 2:
          this.showNormal = false
          this.showLastBattle = true
          break
        case 3:
          this.showLastBattle = false
          this.showSChance = true
          break
        case 4:
          this.showSChance = false
          this.showResult = true
          break 
        default:
          this.showStartScreen = true
          this.showNormal = false
          // ScreenIdが該当しない場合、開始画面を表示する
          this.$store.commit('saveScreenName', 0)
      }
    }
  },
  methods: {
    openModal: function() {
      console.log('Home openModal')
      this.showModal = true
    },
    closeModal: function() {
      console.log('Home closeModal')
      this.showModal = false
    }
  }
}
</script>
<style  lang="scss" scoped>
.home {
  width: 100%;
  .content-left {
    display: inline-block;
    vertical-align: top;
    width: 70%;
    height: 100vh;
    font-size: 16pt;
  }
  .content-right {
    display: inline-block;
    vertical-align: top;
    width: 30%;
    height: 100vh;
    font-size: 12pt;
    .bonus {
      width: 100%;
      .bonus-table {
        width: 90%;
        .left-corumn {
          width: 60%;
        }
        .right-corumn {
          width: 40%;
        }
      }
    }
  }
}
</style>