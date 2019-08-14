<template>
  <div class="home">
    <StartScreen v-if="showStart"/>
    <NormalScreen v-if="showNormal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import StartScreen from '@/components/StartScreen.vue'
import NormalScreen from '@/components/NormalScreen.vue'

export default {
  name: 'home',
  data () {
    return {
      showStart: true,
      showNormal: false
    }
  },
  components: {
    StartScreen,
    NormalScreen
  },
  mounted () {
    this.showStart = true
    this.showNormal = false
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
