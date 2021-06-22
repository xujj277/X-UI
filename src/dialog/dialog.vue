<template>
  <div v-if="visible">
    <div class="x-dialog-overlay" @click="onClickMask"></div>
    <div class="x-dialog-wrapper">
      <div class="x-dialog">
        <header>
          <slot name="title"></slot>
          <span @click="close" class="x-dialog-close"></span>
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
$radius: 4px;
$border-color: #d9d9d9;

.x-dialog {
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade_out(black, 0.5);
  min-width: 15em;
  max-width: 90%;
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black, 0.5);
    z-index: 10;
  }
  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  >header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  >main {
    padding: 12px 16px;
  }
  >footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;
  }
  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
