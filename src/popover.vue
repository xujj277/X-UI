<template>
  <div class="popover" @click="onClick" ref="popover">
    <!--    阻止冒泡 @click.stop-->
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
    data () {
      return {
        visible: false
      }
    },
    methods: {
      positionContent () {
        document.body.appendChild(this.$refs && this.$refs.contentWrapper)
        let { width, height, top, left } = this.$refs.triggerWrapper.getBoundingClientRect()
        this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
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
  transform: translateY(-100%);
  padding: .5em 1em;
  margin-top: -10px;
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
</style>