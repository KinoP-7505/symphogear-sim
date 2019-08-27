<template>
  <!-- コンポーネント Modal -->
  <Modal @close="closeModal" windowWidth="360px" windowHeight="260px">
    <!-- main-content スロットコンテンツ -->
    <template slot="main-content" @close="closeModal()">
      <div>
        {{showNumber}}
      </div>
      <div>
        <InputNumber class="input-box" :inNum="num1" @retNum="(val) => { num1 = val }"/>
        <InputNumber class="input-box" :inNum="num2" @retNum="(val) => { num2 = val }"/>
        <InputNumber class="input-box" :inNum="num3" @retNum="(val) => { num3 = val }"/>
        <InputNumber class="input-box" :inNum="num4" @retNum="(val) => { num4 = val }"/>
      </div>

    </template>
    <!-- footer スロットコンテンツ
    <template slot="footer">
      <div>フッターを書き換え</div>
    </template>
      -->
  </Modal>
</template>

<script>
import Modal from '@/components/Modal/ModalView.vue'
import InputNumber from '@/components/parts/InputNumber.vue'
export default {
  name: 'ModalInputNumber',
  data () {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0
    }
  },
  components: {
    Modal,
    InputNumber
  },
  computed: {
    showNumber: function () {
      return `number = ${this.num1} ${this.num2} ${this.num3} ${this.num4}`
    }
  },
  methods: {
    closeModal: function () {
      console.log('ModalInputNumber closeModal emit close')
      this.$emit('close')
    }
  }
  // end
}
</script>
<style  lang="scss" scoped>
.count-number {
  font-size: 25pt;
}
.input-box {
 display: inline-block;
 width: 36px;
}
</style>