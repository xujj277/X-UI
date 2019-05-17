<template>
  <div class="toast" ref="wrapper">
    <div class="message">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>
    <div class="line" ref="line"></div>
    <span class="close" v-if="closeButton" @click="onClickClose">
      {{closeButton.text}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'xToast',
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 50
      },
      closeButton: {
        type: Object,
        default () {
          return {
            text: '关闭',
            callback: undefined
          }
        }
      },
      enableHtml: {
        type: Boolean,
        default: false
      }
    },
    // created () {
    //   console.log(this.closeButton)
    // },
    mounted () {
      this.autoClose()
      this.updateStyles()
    },
    methods: {
      updateStyles () {
        this.$nextTick(() => {  // 调整 line 的高度
          this.$refs.line.style.height = `${this.$refs.wrapper.getBoundingClientRect().height}px`
        })
      },
      autoClose () {
        if (this.autoClose) {
          setTimeout(() => {
            this.close()
          }, this.autoCloseDelay * 1000)
        }
      },
      close () {
        this.$el.remove()
        this.$destroy()
      },
      onClickClose () {
        this.close()
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback(this)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-background: rgba(0, 0, 0, 0.75);
  .toast {
    font-size: $font-size;
    min-height: $toast-min-height;
    line-height: 1.8;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    display: flex;
    align-items: center;
    color: #ffffff;
    background: $toast-background;
    border-radius: 4px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.50);
    padding: 0 16px;
  }
  .close {
    padding-left: 16px;
    flex-shrink: 0; // 我不缩小
  }
  .line {
    height: 100%;
    border-left: 1px solid #666;
    margin-left: 16px;
  }
  .message {
    padding: 8px 0;
  }
</style>
