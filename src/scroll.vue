<template>
  <div ref="parent" class="x-scroll-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="child" class="x-scroll">
      <slot></slot>
    </div>
    <div class="x-scroll-track" v-show="scrollBarVisible">
      <div class="x-scroll-bar" ref="bar">
        <div class="x-scroll-bar-inner"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.x-scroll {
  transition: transform 0.05s ease;
  &-wrapper {
    border: 1px solid red;
    overflow: hidden;
    position: relative;
  }
  &-track {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 100%;
    border-left: 1px solid #e8e7e8;
    background: #FAFAFA;
    opacity: 0.9;
  }
  &-bar {
    position: absolute;
    top: -1px;
    left: 50%;
    margin-left: -4px;
    height: 40px;
    width: 8px;
    padding: 4px 0;
    
    &-inner {
      height: 100%;
      border-radius: 4px;
      background: #C2C2C2;
      
      &:hover {
        background: #7D7D7D;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'XScroll',
  data () {
    return {
      scrollBarVisible: false
    }
  },
  mounted () {
    const parent = this.$refs.parent
    const child = this.$refs.child
    let translateY = 0
    let {height: childHeight} = child.getBoundingClientRect()
    let {height: parentHeight} = parent.getBoundingClientRect()
    let {borderTopWidth, borderBottomWidth, paddingTop, paddingBottom} = window.getComputedStyle(parent)
    borderTopWidth = parseInt(borderTopWidth)
    borderBottomWidth = parseInt(borderBottomWidth)
    paddingTop = parseInt(paddingTop)
    paddingBottom = parseInt(paddingBottom)
    let maxHeight = childHeight - parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
    parent.addEventListener('wheel', (e) => {
      if (e.deltaY > 20) {
        translateY -= 20 * 3
      } else if (e.deltaY < -20) {
        translateY -= -20 * 3
      } else {
        translateY -= e.deltaY * 3
      }
      if (translateY > 0) {
        translateY = 0
      } else if (translateY < -maxHeight) {
        translateY = -maxHeight
      } else {
        e.preventDefault()
      }
      child.style.transform = `translateY(${translateY}px)`
      this.updateScrollBar(parentHeight, childHeight, translateY)
    })
    this.updateScrollBar(parentHeight, childHeight, translateY)
  },
  methods: {
    updateScrollBar (parentHeight, childHeight, translateY) {
      let barHeight = parentHeight * parentHeight / childHeight
      let bar = this.$refs.bar
      bar.style.height = barHeight + 'px'
      let y = parentHeight * Math.abs(translateY) / childHeight
      bar.style.transform = `translateY(${y}px)`
    },
    onMouseEnter () {
      this.scrollBarVisible = true
    },
    onMouseLeave () { 
      this.scrollBarVisible = false
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
