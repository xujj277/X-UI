<template>
  <div ref="parent" class="x-scroll-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="child" class="x-scroll" :style="{transform: `translateY(${contentY}px)`}">
      <slot></slot>
    </div>
    <div class="x-scroll-track" v-show="scrollBarVisible">
      <div class="x-scroll-bar" ref="bar" @mousedown="onMouseDownScrollbar" @mouseup="onMouseUpScrollbar">
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
      scrollBarVisible: false,
      isScrolling: false,
      startPosition: undefined,
      endPosition: undefined,
      scrollBarY: 0,
      contentY: 0,
      barHeight: undefined,
      parentHeight: undefined,
      childHeight: undefined
    }
  },
  mounted () {
    document.addEventListener('mousemove', (e) => {
      this.onMouseMoveScrollbar(e)
    })
    let parent = this.$refs.parent
    const child = this.$refs.child
    let {height: childHeight} = child.getBoundingClientRect()
    let {height: parentHeight} = parent.getBoundingClientRect()
    this.parentHeight = parentHeight
    this.childHeight = childHeight
    let maxHeight = this.calculateCurrentYMax()
    parent.addEventListener('wheel', (e) => {
      if (e.deltaY > 20) {
        this.contentY -= 20 * 3
      } else if (e.deltaY < -20) {
        this.contentY -= -20 * 3
      } else {
        this.contentY -= e.deltaY * 3
      }
      if (this.contentY > 0) {
        this.contentY = 0
      } else if (this.contentY < -maxHeight) {
        this.contentY = -maxHeight
      } else {
        e.preventDefault()
      }
      this.updateScrollBar(parentHeight, childHeight, this.contentY)
    })
    this.updateScrollBar(parentHeight, childHeight, this.contentY)
  },
  methods: {
    calculateCurrentYMax() {
      let {borderTopWidth, borderBottomWidth, paddingTop, paddingBottom} = window.getComputedStyle(this.$refs.parent)
      borderTopWidth = parseInt(borderTopWidth)
      borderBottomWidth = parseInt(borderBottomWidth)
      paddingTop = parseInt(paddingTop)
      paddingBottom = parseInt(paddingBottom)
      let maxHeight = this.childHeight - this.parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
      return maxHeight
    },
    updateScrollBar (parentHeight, childHeight, translateY) {
      this.barHeight = parentHeight * parentHeight / childHeight
      let bar = this.$refs.bar
      bar.style.height = this.barHeight + 'px'
      let y = parentHeight * translateY / childHeight
      bar.style.transform = `translateY(${-y}px)`
      this.scrollBarY = -y
    },
    onMouseEnter () {
      this.scrollBarVisible = true
    },
    onMouseLeave () { 
      // this.scrollBarVisible = false
      this.isScrolling = false
    },
    onMouseDownScrollbar (e) {
      this.isScrolling = true
      let {screenX, screenY} = e
      this.startPosition = {x: screenX, y: screenY}
    },
    onMouseMoveScrollbar (e) {
      if (!this.isScrolling) return
      let {screenX, screenY} = e
      this.endPosition = {x: screenX, y: screenY}
      let maxScrollHeight = this.parentHeight - this.barHeight
      let delta = {x: this.endPosition.x - this.startPosition.x, y: this.endPosition.y - this.startPosition.y}
      this.scrollBarY = parseInt(this.scrollBarY) + delta.y
      if (this.scrollBarY < 0) {
        this.scrollBarY = 0
      } else if (this.scrollBarY > maxScrollHeight) {
        this.scrollBarY = maxScrollHeight
      }
      this.contentY = -(this.childHeight * this.scrollBarY / this.parentHeight)
      this.startPosition = this.endPosition
      this.$refs.bar.style.transform = `translate(0px, ${this.scrollBarY}px)`
    },
    onMouseUpScrollbar () {
      this.isScrolling = false
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
