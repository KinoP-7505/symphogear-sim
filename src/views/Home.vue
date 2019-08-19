<template>
  <div class="home">
    <StartScreen v-if="showStart"/>
    <NormalScreen v-if="showNormal"/>
    <LastBattle v-if="showLastBattle"/>
    <SChance v-if="showSChance"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StartScreen from '@/components/StartScreen.vue'
import NormalScreen from '@/components/NormalScreen.vue'
import LastBattle from '@/components/LastBattle.vue'
import SChance from '@/components/SChance.vue'
export default {
  name: 'home',
  data () {
    return {
      showStart: true,
      showNormal: false,
      showLastBattle: false,
      showSChance: false
    }
  },
  components: {
    StartScreen,
    NormalScreen,
    LastBattle,
    SChance
  },
  mounted () {
    this.showStart = true
    this.showNormal = false
    this.showLastBattle = false
  },
  computed: {
    // Storeを監視
    nowScreenId: function () {
      return this.$store.state.screenId
    }
  },
  watch: {
    // Store.screenIdが変更された場合、画面表示を切り替える
    nowScreenId: function (id) {
      switch (id) {
        case 1:
          this.showStart = false
          this.showNormal = true
          break
        case 2:
          this.showNormal = false
          this.showLastBattle = true
          break
        case 3:
          this.showLastBattle = false
          this.showSChance = true
          break          
        default:
          this.showStartScreen = true
          this.showNormal = false
          // ScreenIdが該当しない場合、開始画面を表示する
          this.$store.commit('saveScreenName', 0)
      }
    }
  }

}
</script>
