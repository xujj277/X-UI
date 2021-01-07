<template>
  <div class="x-sticky-wrapper" ref="wrapper" :style="{height}">
    <div class="x-sticky" :class="classes" :style="{left, width, top}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xSticky',
    props: {
      distance: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        sticky: false,
        left: undefined,
        width: undefined,
        height: undefined,
        timerId: null,
        top: undefined
      }
    },
    mounted () {
      this.windowScrollHandler = this._windowScrollHandler.bind(this) // 解决vue 中 this 的指向问题
      window.addEventListener('scroll', this.windowScrollHandler)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.windowScrollHandler)
    },
    methods: {
      offsetTop () {
        let {top} = this.$refs.wrapper.getBoundingClientRect()
        return {top: top + window.scrollY}
      },
      _windowScrollHandler () {
        let { top } = this.offsetTop()
        if (window.scrollY > top) {
          let { height, left, width } = this.$refs.wrapper.getBoundingClientRect()
          console.log({ height, left, width })
          this.height = height + 'px'
          this.left = left + 'px'
          this.width = width + 'px'
          this.top = this.distance + 'px'
          this.sticky = true
        } else {
          this.height = undefined
          this.top = undefined
          this.left = undefined
          this.width = undefined
          this.sticky = false
        }
      }
    },
    computed: {
      classes () {
        return {
          sticky: this.sticky
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .x-sticky {
    &.sticky {
      position: fixed;
    }
  }
</style>
