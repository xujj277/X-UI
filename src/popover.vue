<template>
  <div class="popover" @click.stop="xxx">
    <!--    阻止冒泡 @click.stop-->
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <span ref="trigger">
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
      xxx() {
        this.visible = !this.visible
        if (this.visible) {
          this.$nextTick(() => {
            document.body.appendChild(this.$refs.contentWrapper)
            let {width, height, top, left} = this.$refs.trigger.getBoundingClientRect()
            console.log(width, height, top, left)
            this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
            this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
            let eventHandler = () => { // 声明一个要去除的监听器
              this.visible = false
              console.log('document影藏 popover')
              document.removeEventListener('click', eventHandler)
            }
            document.addEventListener('click', eventHandler)
          })
        } else {
          console.log('vm 影藏 popover')
        }
      }
    },
    mounted () {
      console.log(this.$refs.trigger)
    }
  }
</script>

<style scoped lang="scss">
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  position: absolute;
  border: 1px solid red;
  box-shadow: 0 0 3px rgba(0,0,0,0.5);
  transform: translateY(-100%);
}
</style>