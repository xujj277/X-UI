<template>
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
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
          setTimeout(() => {
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
    }
  }
</script>

<style scoped lang="scss">
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  .content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    border: 1px solid red;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
  }
}
</style>