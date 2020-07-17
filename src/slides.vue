<template>
  <div class="x-slides"
       @mouseenter="onMouseEnter"
       @mouseleave="onMouseLeave"
       @touchstart="onTouchStart"
       @touchend="onTouchEnd"
  >
    <div class="x-slides-window" ref="window">
      <div class="x-slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="x-slides-dots">
      <span @click="onClickPrev">
        <x-icon name="left"></x-icon>
      </span>
      <span v-for="n in childrenLength"
            :key="n"
            :data-index="n - 1"
            :class="{active: selectedIndex === n-1}"
            @click="select(n - 1)"
      >
        {{n}}
      </span>
      <span @click="onClickNext">
        <x-icon name="right"></x-icon>
      </span>
    </div>
  </div>
</template>

<script>
  import xIcon from './icon'
  export default {
    name: 'xSlides',
    components: {xIcon},
    props: {
      selected: {
        type: String
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      autoPlayDelay: {
        type: Number,
        default: 3000
      }
    },
    data () {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timerId: undefined,
        startTouch: undefined
      }
    },
    mounted () {
      this.updateChildren()
      if (this.autoPlay) {
        this.playAutomatically()
      }
      this.childrenLength = this.items.length
    },
    updated () {
      this.updateChildren()
    },
    computed: {
      selectedIndex () {
        return this.names.indexOf(this.selected) || 0
      },
      names () {
        return this.items.map(vm => vm.name)
      },
      items () {
        return this.$children.filter(vm => vm.$options.name === 'XSlidesItem')
      }
    },
    methods: {
      onMouseLeave () {
        this.playAutomatically()
      },
      onMouseEnter () {
        this.pause()
      },
      onTouchStart(e) {
        this.pause()
        if (e.touches.length > 1) {return}
        this.startTouch = e.touches[0]
      },
      onTouchEnd(e) {
        let endTouch = e.changedTouches[0]
        let {clientX: x1, clientY: y1} = this.startTouch
        let {clientX: x2, clientY: y2} = endTouch

        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        let deltaY = Math.abs(y2 - y1)
        let rate = distance / deltaY
        if (rate > 2) {
          if (x2 > x1) {
            this.select(this.selectedIndex - 1)
          } else {
            this.select(this.selectedIndex + 1)
          }
        }
        this.$nextTick(() => {
          this.playAutomatically()
        })
      },
      onClickPrev() {
        this.select(this.selectedIndex - 1)

      },
      onClickNext() {
        this.select(this.selectedIndex + 1)

      },
      playAutomatically () {
        if (this.timerId) return
        let run = () => {
          let index = this.names.indexOf(this.getSelected())
          let newIndex = index + 1
          this.select(newIndex)
          this.timerId = setTimeout(run, this.autoPlayDelay)
        }
        this.timerId = setTimeout(run, this.autoPlayDelay)
      },
      pause () {
        window.clearTimeout(this.timerId)
        this.timerId = undefined
      },
      /**
       * 改变选中的值
       * @param index
       */
      select (newIndex) {
        // 边界判断
        if (newIndex === -1) { newIndex = this.names.length - 1}
        if (newIndex === this.names.length) { newIndex = 0 }

        this.lastSelectedIndex = this.selectedIndex
        this.$emit('update:selected', this.names[newIndex])
      },
      getSelected () {
        let first = this.items[0]
        return this.selected || first.name
      },
      updateChildren() {
        let selected = this.getSelected()
        this.items.forEach((vm) => {
          // 看动画是正的还是反的
          let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
          if (this.timerId) {
            if (this.lastSelectedIndex === this.items.length - 1 && this.selectedIndex === 0) {
              reverse = false
            }
            if (this.lastSelectedIndex === 0 && this.selectedIndex === this.items.length - 1) {
              reverse = true
            }
          }
          vm.reverse = reverse
          this.$nextTick(() => {
            vm.selected = selected
          })
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .x-slides {
    &-window {
      overflow: hidden;
    }
    &-wrapper {
      position: relative;
    }
    &-dots {
      padding: 8px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      > span {
        width: 20px;
        height: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #ddd;
        border-radius: 50%;
        margin: 0 8px;
        font-size: 12px;
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: #000;
          color: #fff;
          &:hover {
            cursor: default;
          }
        }
      }
    }
  }
</style>
