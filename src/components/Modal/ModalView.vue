<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="closeWindow()">
      <!-- modal-windowスタイルにwとhを設定 -->
      <div class="modal-window" :style="{width: viewWidth, height: viewHeight }">
        <div class="modal-content">
          <slot name="main-content">
            <span>main-content</span>
          </slot>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="closeWindow()">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'ModalView',
  props: {
    windowWidth: String,
    windowHeight: String
  },
  data () {
    return {
    }
  },
  mounted: {
    
  },
  computed: {
    viewWidth: function () {
      return this.windowWidth
    },
    viewHeight: function () {
      return  this.windowHeight
    }
  },
  methods: {
    closeWindow: function () {
      console.log('ModalView emit close')
      this.$emit('close')
    } 
  }
}
</script>
<style  lang="scss" scoped>
.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  &-content {
    padding: 10px 20px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

// オーバーレイのトランジション
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>