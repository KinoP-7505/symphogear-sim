<template>
  <div>
    <div>
      <img :src="iconUp" width="32px" height="32px" @click="pushUp()"/>
    </div>
    <div>
      <span class="count-number">{{showNum}}</span>
    </div>
    <div>
      <img :src="iconDown" width="32px" height="32px" @click="pushDown()"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InputNumber',
  props: {
    inNum: Number
  },
  data () {
    let num = this.inNum
    return {
      num: num,  
      iconUp: require('@/assets/arrow-up-circle.svg'),
      iconDown: require('@/assets/arrow-down-circle.svg')
    }
  },
  components: {
  },
  computed: {
    showNum: function () {
      return '' + this.num
    }
  },
  methods: {
    pushUp: function () {
      console.log('pushUp')
      if (this.num < 9) {
        ++this.num
        this.$emit('retNum', this.num)
      }
    },
    pushDown: function () {
      console.log('pushDown')
      if (this.num > 0) {
        --this.num
        this.$emit('retNum', this.num)
      } 
    }
  }
  // end
}
</script>
<style  lang="scss" scoped>
.count-number {
  font-size: 25pt;
}
</style>