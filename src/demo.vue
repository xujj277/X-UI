<template>
  <div class="box-wrapper" ref="list" @scroll="scrollEvent($event)">
    <div :style="{height: this.listHeight + 'px'}">
      <div :style="{transform: getTransform}">
        <p class="box" v-for="item in visibleData">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.page {
  display: flex;
  justify-content: center;
}
 .parent {
   height: 400px;
   overflow: hidden;
   width: 400px;
   border: 5px solid red;
   box-sizing: border-box;
 }
 .child {
   border: 5px solid green;
   box-sizing: border-box;
 }
 
 .hide {
   opacity: 0.2;
 }
</style>

<script>
export default {
  name: 'demo',
  data() {
    let array = [
      {name: 'xujinjun', score: 100},
      {name: 'xjj', score: 99},
      {name: 'xujin', score: 22},
      {name: 'x', score: 3},
      {name: 'xujun', score: 44},
      {name: 'xj', score: 55},
      {name: 'jinjun', score: 66},
      {name: 'jj', score: 88},
      {name: 'xujinjun', score: 100},
      {name: 'xjj', score: 99},
      {name: 'xujin', score: 22},
      {name: 'x', score: 3},
      {name: 'xujun', score: 44},
      {name: 'xj', score: 55},
      {name: 'jinjun', score: 66},
      {name: 'jj', score: 88},
      {name: 'x', score: 3},
      {name: 'xujun', score: 44},
      {name: 'xj', score: 55},
      {name: 'jinjun', score: 66},
    ]
    let bigArray = []
    for (let i = 0; i < 5; i++) {
      bigArray.push(...array.map((item, index) => {
        return {id: i * 20 + index, ...item}
      }))
    }
    return {
      currentPage: 1,
      selected: [],
      orderBy: {
        // name: 'dsc',
        score: ''
      },
      dataSource: [...bigArray],
      loading: false,
      screenHeight: 400,
      itemHeight: 40,
      start: 0,
      end: undefined,
      startOffset: 0,
    }
  },
  computed: {
    listHeight () {
      return this.dataSource.length * this.itemHeight
    },
    visibleCount () {
      return Math.ceil(this.screenHeight / this.itemHeight) + 1
    },
    visibleData () {
      return this.dataSource.slice(this.start, Math.min(this.end, this.dataSource.length))
    },
    getTransform () {
      return `translate3d(0, ${this.startOffset}px, 0)`
    }
  },
  mounted () {
    console.log(1111, this.listHeight, this.visibleCount)
    this.end = this.start + this.visibleCount;
  },
  methods: {
    scrollEvent (e) {
      let scrollTop = this.$refs.list.scrollTop
      this.start = Math.floor(scrollTop / this.itemHeight)
      this.end = this.start + this.visibleCount
      this.startOffset = scrollTop - (scrollTop % this.itemHeight)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  --font-size: 14px;
}
body {
  font-size: var(--font-size);
}
</style>

<style lang="scss">
.box-wrapper {
  width: 400px;
  height: 400px;
  overflow: auto;
  border: 1px solid rebeccapurple;
  margin: auto;
  .box {
    height: 40px;
    //background-color: lightblue;
  }
  .box:nth-child(2n) {
    //background-color: lightgoldenrodyellow;
  }
}
</style>