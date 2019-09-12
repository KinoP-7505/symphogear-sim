<template>
  <div class="home">
    <!-- 左画面 -->
    <div class="content-left">
      <StartScreen v-if="showStart"/>
      <NormalScreen v-if="showNormal"/>
      <LastBattle v-if="showLastBattle"/>
      <SChance v-if="showSChance"/>
      <ResultScreen v-if="showResult"/>
    </div>
    <!-- 右画面 -->
    <div class="content-right">
      <!-- 消費ユキチ -->
      <div class="yukiti">
        DEATH YUKICHI
      </div>
      <div class="yukiti">
        {{showYukiti}}
      </div>
      <!-- 不足500 -->
      <div class="yukiti">
        Loss 500P
      </div>
      <div class="yukiti">
        {{showPow500}}
      </div>
      <!-- 現在玉 -->
      <div class="yukiti">
        持ち魂
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
            <td>絶唱</td><td>{{$store.state.GameInfo.hisBonus.total}}</td>
          </tr>
          <tr>
            <td>通常４Ｒ</td><td>{{$store.state.GameInfo.hisBonus.normal4R}}</td>
          </tr>
          <tr>
            <td>通常１５Ｒ</td><td>{{$store.state.GameInfo.hisBonus.normal15R}}</td>
          </tr>
          <tr>
            <td>右打４Ｒ</td><td>{{$store.state.GameInfo.hisBonus.right4R}}</td>
          </tr>
          <tr>
            <td>右打８Ｒ</td><td>{{$store.state.GameInfo.hisBonus.right8R}}</td>
          </tr>
          <tr>
            <td>右打１２Ｒ</td><td>{{$store.state.GameInfo.hisBonus.right12R}}</td>
          </tr>
          <tr>
            <td>右打１５Ｒ</td><td>{{$store.state.GameInfo.hisBonus.right15R}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StartScreen from '@/components/StartScreen.vue'
import NormalScreen from '@/components/NormalScreen.vue'
import LastBattle from '@/components/LastBattle.vue'
import SChance from '@/components/SChance.vue'
import ResultScreen from '@/components/ResultScreen.vue'

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
    ResultScreen
  },
  mounted () {
    this.showStart = true
    this.showNormal = false
    this.showLastBattle = false
    this.showResult = false
  },
  computed: {
    // Storeを監視
    nowScreenId: function () {
      return this.$store.state.screenId
    },
    showYukiti: function () {
      // 500pを10000pへ変換
      let pow = Math.floor(this.$store.state.GameInfo.pow500 / 20)
      let money = pow * 10000
      return `${pow} ( ${money} )`
    },
    showPow500: function () {
      // あまり500p
      let pow = this.$store.state.GameInfo.pow500 % 20
      let money = pow * 500
      return `${pow} ( ${money} )`
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
          this.showLastBattle = false
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
    font-size: 14pt;
    .bonus {
      width: 100%;
      .bonus-table {
        width: 90%;
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: fixed;
        .left-corumn {
          width: 60%;
          background-color:#f5b932;
        }
        .right-corumn {
          width: 40%;
          background-color: #25b327;
        }
        th {
          text-align: center;
          padding: 7px 0;
          border-right:solid 1px #ddd;
          border-left:solid 1px #ddd;
          width: 155px;
        }
        // th:nth-child(1){
        //   background-color:#dddddd;
        // }
        // th:nth-child(3){
        //   background-color:#f5b932;
        //   color: white;
        // }
        // tr:nth-child(2) td{
        //   font-size: 30px;
        // }
        td {
          text-align: center;
          padding: 7px 0;
          border-right:solid 1px #ddd;
          border-left:solid 1px #ddd;
          width: 155px;
        }
        td a{
          background-color: #25b327;
          color: white;
          padding:5px 20px;
          border-radius: 30px;
          font-weight: bold;
        }
        // .popular{
          // width: 180px;
        // }
        th.popular{
          position: relative;
        }
        th.popular span.no1{
          position: absolute;
          top: -10px;
          left:calc(50% - 30px);
          background: #bdcc28;
          width: 60px;
          font-size: 10px;
          border-radius: 15px;
          line-height: 1;
          padding: 5px;
        }
        th.popular span.inner{
          position: absolute;
          color:white;
          background-color: #f34955;
          left: 0;
          bottom: 0;
          display: block;
          width: 180px;
          padding: 10px 0;
        }
        // end
      }
    }
  }
}
</style>