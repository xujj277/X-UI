<template>
  <div class="x-slides"
       @mouseenter="onMouseEnter"
       @mouseleave="onMouseLeave"
  >
    <div class="x-slides-window" ref="window">
      <div class="x-slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="x-slides-dots">
      <span v-for="n in childrenLength"
            :class="{active: selectedIndex === n-1}"
            @click="select(n-1)"
      >
        {{n-1}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xSlides',
    props: {
      selected: {
        type: String
      }
    },
    data () {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
        timerId: undefined
      }
    },
    mounted () {
      this.updateChildren()
      this.playAutomatically()
      this.childrenLength = this.$children.length
    },
    updated () {
      this.updateChildren()
    },
    computed: {
      selectedIndex () {
        return this.names.indexOf(this.selected) || 0
      },
      names () {
        return this.$children.map(vm => vm.name)
      }
    },
    methods: {
      onMouseLeave () {
        this.playAutomatically()
      },
      onMouseEnter () {
        this.pause()
      },
      playAutomatically () {
        if (this.timerId) return
        let run = () => {
          let index = this.names.indexOf(this.getSelected())
          let nexIndex = index - 1
          // 边界判断
          if (nexIndex === -1) { nexIndex = this.names.length - 1}
          if (nexIndex === this.names.length) { nexIndex = 0 }
          this.select(nexIndex)
          this.timerId = setTimeout(run, 1000)
        }
        this.timerId = setTimeout(run, 1000)
      },
      pause () {
        window.clearTimeout(this.timerId)
        this.timerId = undefined
      },
      select (index) {
        this.lastSelectedIndex = this.selectedIndex
        this.$emit('update:selected', this.names[index])
      },
      getSelected () {
        let first = this.$children[0]
        return this.selected || first.name
      },
      updateChildren() {
        let selected = this.getSelected()
        this.$children.forEach((vm) => {
          // 看动画是正的还是反的
          vm.reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
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
      > span {
        &.active {
          background: red;
        }
      }
    }
  }
</style>
