<template>
  <div ref="parent" class="x-scroll-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave" @wheel="onWheel">
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
    this.listenToDocument()
    this.parentHeight = this.$refs.parent.getBoundingClientRect().height
    this.childHeight = this.$refs.child.getBoundingClientRect().height
    this.updateScrollBar()
  },
  computed: {
    maxScrollHeight () {
      return this.parentHeight - this.barHeight
    }
  },
  methods: {
    listenToDocument () {
      document.addEventListener('mousemove', e => this.onMouseMoveScrollbar(e))
      document.addEventListener('mouseup', e => this.onMouseUpScrollbar(e))
    },
    onWheel (e) {
      // 更新 contentY
      this.updateContentY(e, () => e.preventDefault())
      this.updateScrollBar()
    },
    updateContentY (e, fn) {
      let maxHeight = this.calculateCurrentYMax()
      this.contentY = this.calculateContentYFromDeltaY(this.contentY, e.deltaY)
      if (this.contentY > 0) {
        this.contentY = 0
      } else if (this.contentY < -maxHeight) {
        this.contentY = -maxHeight
      } else {
        fn && fn()
      }
    },
    calculateContentYFromDeltaY (contentY, deltaY) {
      let newValue = contentY
      if (deltaY > 20) {
        newValue -= 20 * 3
      } else if (deltaY < -20) {
        newValue -= -20 * 3
      } else {
        newValue -= deltaY * 3
      }
      return newValue
    },
    calculateCurrentYMax() {
      let {borderTopWidth, borderBottomWidth, paddingTop, paddingBottom} = window.getComputedStyle(this.$refs.parent)
      borderTopWidth = parseInt(borderTopWidth)
      borderBottomWidth = parseInt(borderBottomWidth)
      paddingTop = parseInt(paddingTop)
      paddingBottom = parseInt(paddingBottom)
      let maxHeight = this.childHeight - this.parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom)
      return maxHeight
    },
    updateScrollBar () {
      let parentHeight = this.parentHeight
      let childHeight = this.childHeight
      this.barHeight = parentHeight * parentHeight / childHeight
      this.$refs.bar.style.height = this.barHeight + 'px'
      this.scrollBarY = -(parentHeight * this.contentY / childHeight)
      this.$refs.bar.style.transform = `translateY(${this.scrollBarY}px)`
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
      this.endPosition = {x: e.screenX, y: e.screenY}
      let delta = {x: this.endPosition.x - this.startPosition.x, y: this.endPosition.y - this.startPosition.y}
      this.scrollBarY = this.calculateScrollBarY(delta)
      this.contentY = -(this.childHeight * this.scrollBarY / this.parentHeight)
      this.startPosition = this.endPosition
      this.$refs.bar.style.transform = `translate(0px, ${this.scrollBarY}px)`
    },
    calculateScrollBarY(delta) {
      let newValue = parseInt(this.scrollBarY) + delta.y
      if (newValue < 0) {
        newValue = 0
      } else if (newValue > this.maxScrollHeight) {
        newValue = this.maxScrollHeight
      }
      return newValue
    },
    onMouseUpScrollbar () {
      this.isScrolling = false
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
