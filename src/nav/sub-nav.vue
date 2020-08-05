<template>
  <div class="x-sub-nav">
    <span @click="onClick">
      <slot name="title"></slot>
    </span>
    <div class="x-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'XSubNav',
    data () {
      return {
        open: false
      }
    },
    methods: {
      onClick () {
        this.open = !this.open
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "var";
  .x-sub-nav {
    position: relative;
    > span {
      padding: 10px 20px;
      display: block;
    }
    &-popover {
      background: white;
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 1px;
      white-space: nowrap;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      color: $light-color;
      font-size: $font-size;
      min-width: 8em;
    }
  }

  .x-sub-nav .x-sub-nav .x-sub-nav-popover {
    top: 0;
    left: 100%;
    margin-left: 8px;
  }
</style>
