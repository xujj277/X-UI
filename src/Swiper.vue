<template>
  <div class="swiper-component"
       @touchstart="touchStart"
       @touchend="touchEnd"
  >
    <div class="title">
      {{ title }}
    </div>
    <div class="swiper-window">
      <div class="swiper-wrapper" :style="{transform: `translateX(${wrapOffset}px)`, transition: transition && 'transform 0.2s ease'}">
        <slot></slot>
      </div>
    </div>
    <div class="dot-wrapper"></div>
  </div>
</template>

<script>
export default {
  name: 'Swiper',
  data () {
    return {
      activeIndex: 0,
      transition: true,
      clientWidth: undefined,
      startTouch: undefined,
    }
  },
  props: {
    title: {
      type: String,
    },
    // transition: {
    //   // 轮播图过渡时长
    //   type: Number,
    //   default: function () {
    //     return 200
    //   },
    // },
  },
  computed: {
    itemWidth() {
      return this.$children[0].$el.clientWidth
    },
    wrapOffset() {
      return this.activeIndex * 300 * -1
    }
  },
  mounted () {
    this.setItemPosition()
  },
  methods: {
    setItemPosition() {
      this.$children.forEach((i, index, arr) => {
        let offsetLeft = index * 300
        if (index === arr.length - 1 && this.activeIndex <= 0) {
          offsetLeft = -300
        }
        if (index === 0 && this.activeIndex >= arr.length - 1) {
          offsetLeft = 300 * this.$children.length
        }
        i.$el.style.transform = `translateX(${offsetLeft}px)`
      })
    },
    // 轮播位移
    moveLate (move) {
      if (!move) move = 0
    },
    // 轮播位移持续时间
    moveTime (transition) {
      if (!transition) transition = 0
    },
    // 拖动开始
    touchStart (e) {
      if (e.touches.length > 1) {return}
      this.startTouch = e.touches[0]
    },
    // 拖动结束
    touchEnd (e) {
      let endTouch = e.changedTouches[0]
      let { clientX: x1, clientY: y1 } = this.startTouch
      let { clientX: x2, clientY: y2 } = endTouch
      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      let deltaY = Math.abs(y2 - y1)
      let rate = distance / deltaY

      if (rate > 2) {
        if (x2 > x1) {
          this.moveLate(this.clientWidth)
          this.activeIndex--
        } else {
          this.moveLate(-this.clientWidth)
          this.activeIndex++
        }
      }
      console.log(this.activeIndex)
      if (this.activeIndex < 0) {
        setTimeout(() => {
          this.transition = false
          this.activeIndex = this.$children.length - 1
          console.log(1111, this.activeIndex)
          this.setItemPosition()
          setTimeout(() => {
            this.transition = true
          }, 100)
        }, 300)
      }
      
      if (this.activeIndex >= this.$children.length) {
        setTimeout(() => {
          this.transition = false
          this.activeIndex = 0
          this.setItemPosition()
          setTimeout(() => {
            this.transition = true
          }, 100)
        }, 300)
      }
      this.setItemPosition()
    },
    // 无缝轮播判断
    setActive (active) {
      if (active === 0) {
        this.active = -(this.swipeList.length - 1)
      } else if (active === -(this.swipeList.length - 1)) {
        this.active = 0
      }
      // setTimeout(() => {
      //   this.moveLate()
      //   console.log(222, this.active)
      // }, this.transition)
    },
  },
}
</script>

<style lang='scss' scoped>
.swiper-component {
  width: 300px;
  height: 100%;
  .swiper-window {
    overflow: hidden;
    width: 100%;
    height: 100%;

    .swiper-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}
</style>

<style>
body {
  width: 100%;
  overflow: hidden;
}
</style>
