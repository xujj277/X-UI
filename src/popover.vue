<template>
  <div class="popover" ref="popover">
    <!--    阻止冒泡 @click.stop-->
    <div ref="contentWrapper" 
         class="x-popover-content-wrapper"
         :class="[`position-${position}`]"
         v-if="visible"
    >
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'xPopover',
    props: {
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) > -1
        }
      },
      trigger: {
        type: String,
        default: 'click',
        validator (value) {
          return ['click', 'hover'].indexOf(value) > -1
        }
      },
      container: {
        type: Element
      }
    },
    data () {
      return {
        visible: false
      }
    },
    mounted() {
      if (this.trigger === 'click') {
        this.$refs.popover.addEventListener('click', this.onClick)
      } else {
        this.$refs.popover.addEventListener('mouseenter', this.open)
        this.$refs.popover.addEventListener('mouseleave', this.close)
      }
    },
    beforeDestroy() {
      if (this.trigger === 'click') {
        this.$refs.popover.removeEventListener('click', this.onClick)
      } else {
        this.$refs.popover.removeEventListener('mouseenter', this.open)
        this.$refs.popover.removeEventListener('mouseleave', this.close)
      }
    },
    methods: {
      /**
       * 定位 popover 位置
       */
      positionContent () {
        const {triggerWrapper, contentWrapper} = this.$refs;
        (this.container || document.body).appendChild(contentWrapper)
        const {width, height, left, top} = triggerWrapper.getBoundingClientRect()
        const {height: height2} = contentWrapper.getBoundingClientRect()
        const positions = {
          top: {
            top: top + window.scrollY,
            left: left + window.scrollX
          },
          bottom: {
            top: top + window.scrollY + height,
            left: left + window.scrollX
          },
          left: {
            top: top + window.scrollY + (height - height2) / 2,
            left: left + window.scrollX
          },
          right: {
            top: top + window.scrollY + (height - height2) / 2,
            left: left + window.scrollX + width
          }
        }
        contentWrapper.style.left = positions[this.position].left + 'px'
        contentWrapper.style.top = positions[this.position].top + 'px'
      },
      /**
       * 看点击的是不是按钮部分
       * @param event
       */
      onClick(event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (this.visible) {
            this.close()
          } else {
            this.open()
          }
        }
      },
      open () {
        this.visible = true
        this.$emit('open')
        this.$nextTick(() => {
          this.positionContent()
          document.addEventListener('click', this.onClickDocument)
        })
      },
      close () {
        this.visible = false
        this.$emit('close')
        document.removeEventListener('click', this.onClickDocument)
      },
      onClickDocument (e) {
        if (this.$refs.popover && (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) return
        if (this.$refs.contentWrapper && (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))) return
        this.close()
      }
    }
  }
</script>

<style scoped lang="scss">
  $border-color: #333;
  $border-radius: 4px;
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.x-popover-content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  /*box-shadow: 0 0 3px rgba(0,0,0,0.5);*/
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.5));
  padding: .5em 1em;
  max-width: 20em;
  word-break: break-all;
  background: white;
  &::before,&::after {
    content: '';
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,&::after {
      left: 10px;
    }
    &::before {
      border-bottom: none;
      border-top-color: $border-color;
      top: 100%;
    }
    &::after {
      border-bottom: none;
      border-top-color: white;
      top: calc(100% - 2px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,&::after {
      left: 10px;
    }
    &::before {
      border-top: none;
      border-bottom-color: $border-color;
      bottom: 100%;
    }
    &::after {
      border-top: none;
      border-bottom-color: white;
      bottom: calc(100% - 2px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,&::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-right: none;
      border-left-color: $border-color;
      left: 100%;
    }
    &::after {
      border-right: none;
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,&::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-left: none;
      border-right-color: $border-color;
      right: 100%;
    }
    &::after {
      border-left: none;
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>