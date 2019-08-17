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
        999000,
        139860,
        59940,
        799200,
        73656, // 4R閾値
        744 // 15R閾値
      ]

      // 判定閾値
      let res0Val = values[0]
      let res1Val = res0Val + values[1]
      let res2Val = res1Val + values[2]
      let res3Val = res2Val + values[3]
      let res4Val = res3Val + values[4]
      let res5Val = res4Val + values[5]
      let res6Val = res5Val + values[6]

      let lot = {}
      let testValue = 0
      // 閾値テスト

      // ハズレ（０）max
      testValue = res0Val - 1
      lot = getLotResult(testValue)
      console.log('test1 loss 0', lot)

      // 右打ち4R（1）min
      testValue = res0Val
      lot = getLotResult(testValue)
      console.log('test2 R4Rmin 1', lot)

      // 右打ち4R（1）max
      testValue = res1Val - 1
      lot = getLotResult(testValue)
      console.log('test3 R4RMax 1', lot)      

      // 右打ち8R（2）min
      testValue = res1Val
      lot = getLotResult(testValue)
      console.log('test4 R8Rmin 2', lot)

      // 右打ち8R（2）max
      testValue = res2Val - 1
      lot = getLotResult(testValue)
      console.log('test5 R8Rmax 2', lot)      

      // 右打ち12R（3）min
      testValue = res2Val
      lot = getLotResult(testValue)
      console.log('test6 R12Rmin 3', lot)

      // 右打ち12R（3）max
      testValue = res3Val - 1
      lot = getLotResult(testValue)
      console.log('test7 R12Rmax 3', lot)    

      // 右打ち15R（4）min
      testValue = res3Val
      lot = getLotResult(testValue)
      console.log('test8 R15Rmin 4', lot)

      // 右打ち15R（4）max
      testValue = res4Val - 1
      lot = getLotResult(testValue)
      console.log('test9 R15Rmax 4', lot)    

      // 4R（5）min
      testValue = res4Val
      lot = getLotResult(testValue)
      console.log('test10 4Rmin 5', lot)

      // 4R（5）max
      testValue = res5Val - 1
      lot = getLotResult(testValue)
      console.log('test11 4Rmax 5', lot)      

      // 15R（6）min
      testValue = res6Val
      lot = getLotResult(testValue)
      console.log('test12 15Rmin 6', lot)

      // 15R（6）
      testValue = res6Val - 1
      lot = getLotResult(testValue)
      console.log('test13  15Rmin 6', lot)      
    }
  }
}
</script>