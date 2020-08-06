<template>
  <div class="x-sub-nav" :class="{active}" v-click-outside="close">
    <span class="x-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="x-sub-nav-icon" :class="{open}">
        <x-icon name="right"></x-icon>
      </span>
    </span>
    <div class="x-sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import ClickOutside from '../click-outside'
  import XIcon from '../icon'
  export default {
    name: 'XSubNav',
    inject: ['root'],
    directives: {ClickOutside},
    components: {XIcon},
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        open: false,
      }
    },
    computed: {
      active() {
        return this.root.namePath.indexOf(this.name) >= 0
      }
    },
    methods: {
      onClick () {
        this.open = !this.open
      },
      close () {
        this.open = false
      },
      updateNamePath () {
        this.root.namePath.unshift(this.name)
        if(this.$parent.updateNamePath) {
          this.$parent.updateNamePath()
        } else {

        }
      },
    }
  }
</script>

<style lang='scss' scoped>
  @import "var";
  .x-sub-nav {
    position: relative;

    &.active {
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom: 2px solid $blue;
        width: 100%;
      }
    }
    &-label {
      padding: 10px 20px;
      display: block;
    }
    &-icon {
      display: none;
    }
    &-popover {
      background: white;
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 4px;
      white-space: nowrap;
      box-shadow: 0 0 3px fade_out(black, 0.8);
      border-radius: $border-radius;
      color: $light-color;
      font-size: $font-size;
      min-width: 8em;
    }
  }

  .x-sub-nav .x-sub-nav  {
    &.active {
      &::after {
        display: none;
      }
    }
    .x-sub-nav-popover {
      top: 0;
      left: 100%;
      margin-left: 8px;
    }
    .x-sub-nav-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .x-sub-nav-icon {
      display: inline-flex;
      transition: transform 0.25s;
      margin-left: 1em;
      svg {
        fill: $light-color;
      }

      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>
