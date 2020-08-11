<template>
  <div class="x-sub-nav" :class="{active, vertical}" v-click-outside="close">
    <span class="x-sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="x-sub-nav-icon" :class="{open, vertical}">
        <x-icon name="right"></x-icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition name="x"
                  @enter="enter"
                  @leave="leave"
                  @after-leave="afterLeave"
                  @after-enter="afterEnter"
      >
        <div class="x-sub-nav-popover" v-show="open" :class="{vertical}">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="x-sub-nav-popover" v-show="open">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
  import ClickOutside from '../click-outside'
  import XIcon from '../icon'
  export default {
    name: 'XSubNav',
    inject: ['root', 'vertical'],
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
      /**
       * 用 js 实现 数列菜单动画
       * @param el
       * @param done
       */
      enter (el, done) {
        let {height} = el.getBoundingClientRect()
        el.style.height = 0
        el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.addEventListener('transitionend', () => {
          done()
        })
      },
      afterEnter (el) {
        el.style.height = 'auto'
      },
      leave (el, done) {
        let {height} = el.getBoundingClientRect()
        el.style.height = `${height}px`
        el.getBoundingClientRect()
        el.style.height = 0
        el.addEventListener('transitionend', () => {
          done()
        })
      },
      afterLeave (el) {
        el.style.height = 'auto'
      },
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

    &:not(.vertical) {
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
      transition: height 250ms;

      &.vertical {
        position: static;
        border: none;
        box-shadow: none;
        border-radius: 0;
        overflow: hidden;
      }
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

      &.vertical {
        transform: rotate(90deg);
        &.open {
          transform: rotate(270deg);
        }
      }

      &.open {
        transform: rotate(180deg);
      }
    }
  }
</style>
