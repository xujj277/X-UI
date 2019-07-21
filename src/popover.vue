<template>
  <div class="popover" @click="onClick" ref="popover">
    <!--    阻止冒泡 @click.stop-->
    <div ref="contentWrapper" class="content-wrapper" v-if="visible"
      :class="{[`position-${position}`]: true}"
    >
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display: inline-block">
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
          return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
        }
      }
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      positionContent () {
        const {contentWrapper, triggerWrapper} = this.$refs
        document.body.appendChild(this.$refs && contentWrapper)
        let { width, height, top, left } = triggerWrapper.getBoundingClientRect()
        if (this.position === 'top') {
          contentWrapper.style.left = left + window.scrollX + 'px'
          contentWrapper.style.top = top + window.scrollY + 'px'
        } else if (this.position === 'bottom') {
          contentWrapper.style.left = left + window.scrollX + 'px'
          contentWrapper.style.top = top + height + window.scrollY + 'px'
        } else if (this.position === 'left') {
          contentWrapper.style.left = left + window.scrollX + 'px'
          let {height: height2} = contentWrapper.getBoundingClientRect()
          contentWrapper.style.top = top + window.scrollY + (height - height2) / 2 + 'px'
        } else if (this.position === 'right') {
          contentWrapper.style.left = left + window.scrollX + width + 'px'
          let {height: height2} = contentWrapper.getBoundingClientRect()
          contentWrapper.style.top = top + window.scrollY + (height - height2) / 2 + 'px'
        }
      },
      eventHandler (e) {
        if (this.$refs.popover &&
          (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
        ) { return }
        if (this.$refs.contentWrapper &&
          (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))
        ) { return }
        this.close()
        console.log('结束监听')
      },
      open () {
        this.visible = true
        this.$nextTick(() => {
          this.positionContent()
          document.addEventListener('click', this.eventHandler)
        })
      },
      close () {
        this.visible = false
        document.removeEventListener('click', this.eventHandler)
      },
      onClick (event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (this.visible) {
            this.close()
          } else {
            this.open()
          }
        }
      }
    },
    mounted () {
      console.log(this.$refs.triggerWrapper)
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
.content-wrapper {
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
      border-top-color: $border-color;
      top: 100%;
    }
    &::after {
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
      border-bottom-color: $border-color;
      bottom: 100%;
    }
    &::after {
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
      border-left-color: $border-color;
      left: 100%;
    }
    &::after {
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
      border-right-color: $border-color;
      right: 100%;
    }
    &::after {
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>