<template>
  <div v-if="visible">
    <div class="mask" @click="onClickMask"></div>
    <div class="dialog">
      <header>
        <slot name="title"></slot>
      </header>
      <main>
        <slot name="content"></slot>
      </main>
      <footer>
        <x-button theme="primary" @click="onClickConfirm">确认</x-button>
        <x-button @click="onClickCancel">取消</x-button>
      </footer>
    </div>
  </div>
</template>

<script>
import XButton from '../button/button'

export default {
  name: 'xDialog',
  components: {
    XButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    ok: {
      type: Function
    },
    cancel: {
      type: Function
    }
  },
  methods: {
    onClickMask () {
      if (this.closeOnClickOverlay === true) {
        this.close()
      }
    },
    close () {
      this.$emit('update:visible', false)
    },
    onClickConfirm () {
      if (this.ok && this.ok() !== false) {
        this.close()
      }
    },
    onClickCancel () {
      if (this.cancel && this.cancel() !== false) {
        this.close()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: fade_out(black, 0.5);
  z-index: 10;
}
.dialog {
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 3px fade_out(black, 0.5);
  min-width: 15em;
  max-width: 90%;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
}
</style>
