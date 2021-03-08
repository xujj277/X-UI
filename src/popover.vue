<template>
  <div class="popover" ref="popover">
    <!--    阻止冒泡 @click.stop-->
    <div ref="contentWrapper"
         class="x-popover-content-wrapper"
         v-if="visible"
         :class="[{[`position-${position}`]: true}, popClassName]"
    >
      <slot name="content"
            :close="close"
      ></slot>
    </div>
    <span ref="triggerWrapper"
          style="display: inline-block"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'xPopover',
    props: {
      popClassName: {
        type: String
      },
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
        }
      },
      trigger: {
        type: String,
        default: 'click',
        validator (value) {
          return ['click', 'hover'].indexOf(value) >= 0
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
    computed: {
      openEvent () {
        if (this.trigger === 'click') {
          return 'click'
        } else {
          return 'mouseenter'
        }
      },
      closeEvent () {
        if (this.trigger === 'click') {
          return 'click'
        } else {
          return 'mouseleave'
        }
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
        const {contentWrapper, triggerWrapper} = this.$refs;
        (this.container || document.body).appendChild(contentWrapper)
        const { width, height, top, left } = triggerWrapper.getBoundingClientRect()
        const {height: height2} = contentWrapper.getBoundingClientRect()
        let positions = { // 表驱动编程优化
          top: {
            top: top + window.scrollY,
            left: left + window.scrollX,
          },
          bottom: {
            top: top + height + window.scrollY ,
            left: left + window.scrollX,
          },
          left: {
            top: top + window.scrollY + (height - height2) / 2,
            left: left + window.scrollX,
          },
          right: {
            top: top + window.scrollY + (height - height2) / 2,
            left: left + window.scrollX + width,
          },
        }
        contentWrapper.style.left = positions[this.position].left + 'px'
        contentWrapper.style.top = positions[this.position].top + 'px'
      },
      onClickDocument (e) {
        if (this.$refs.popover &&
          (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
        ) { return }
        if (this.$refs.contentWrapper &&
          (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))
        ) { return }
        this.close()
      },
      open () {
        this.visible = true
        this.$nextTick(() => {
          this.positionContent()
          document.addEventListener('click', this.onClickDocument)
        })
      },
      close () {
        this.visible = false
        document.removeEventListener('click', this.onClickDocument)
      },
      /**
       * 看点击的是不是按钮部分
       * @param event
       */
      onClick (event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (this.visible === true) {
            this.close()
          } else {
            this.open()
          }
        }
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