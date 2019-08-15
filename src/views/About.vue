<template>
  <div class="about">
    <h1>This is an TEST page</h1>
    <div>
      <button @click="onClickStart">{{buttonLabel}}</button>
    </div>    
    <div>
      {{showMessage}}
    </div>    
  </div>
</template>
<script>
import {getLotResult} from '@/utility/utils.js'
export default {
  name: 'TestAbout',
  data () {
    let messages = ['result']
    return {
      messages: messages
    }
  },
  computed: {
    showMessage: function () {
      return this.messages[0]
    },
    buttonLabel: function () {
        return 'テスト'
    }
  },
  methods: {
    onClickStart: function() {
      let values = [
        12792720, // ハズレ閾値
        1998000, // 右打ち閾値
        73656, // 4R閾値
        744 // 15R閾値
      ]

      let lot = {}
      let testValue = 0
      let baseValue = 0
      // 閾値テスト

      baseValue +=  values[0]
      // ハズレ（０）max
      testValue = baseValue - 1
      lot = getLotResult(testValue)
      console.log('test1 0', lot)

      // 右打ち（１）min
      testValue = baseValue
      lot = getLotResult(testValue)
      console.log('test2 1', lot)

      baseValue += values[1]

      // 右打ち（１）max
      testValue = baseValue - 1
      lot = getLotResult(testValue)
      console.log('test3 1', lot)      

      // 4R（2）min
      testValue = baseValue
      lot = getLotResult(testValue)
      console.log('test4 2', lot)

      baseValue += values[2]

      // 4R（2）max
      testValue = baseValue - 1
      lot = getLotResult(testValue)
      console.log('test5 2', lot)      

      // 15R（3）min
      testValue = baseValue
      lot = getLotResult(testValue)
      console.log('test6 3', lot)

      baseValue += values[3]

      // 15R（3）
      testValue = baseValue - 1
      lot = getLotResult(testValue)
      console.log('test7 3', lot)      
    }
  }
}
</script>