<template>
  <div class="title">
    <div>
      <span>最終決戦</span>
    </div>
    <div>
      <button @click="onClickStart">{{buttonLabel}}</button>
    </div>

  </div>
</template>
<script>
// import utils from '@/utility/utils.js'
export default {
  name: 'LastBattle',
  data () {
    return {
      status: 0
    }
  },
  computed: {
    buttonLabel: function () {
      let label = ''
      // ボタン名を変える
      switch (this.status) {
        case 0:
            label = '右を狙って！！'
            break
        case 1:
            label = '１戦目の結果'
            break
        case 2:
            label = '２戦目の結果'
            break
        case 3:
            label = '３戦目の結果'
            break
        case 4:
            label = '４戦目の結果'
            break
        case 5:
            label = '５戦目の結果'
            break
        default:
            label = '右を狙って！！'
            break
      }
      return label
    }
  },
  methods: {
    onClickStart: function() {
      ++this.status
      if (this.status > 5) {
        this.status = 0
      }
    }
  }
}
</script>
