<template>
  <div class="x-nav-item" :class="{selected, vertical}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'XNavItem',
    inject: ['root', 'vertical'],
    props: {
      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        selected: false
      }
    },
    created () {
      this.root.addItem(this)
    },
    methods: {
      onClick() {
        this.root.namePath = []
        this.$parent.updateNamePath && this.$parent.updateNamePath()
        this.$emit('update:selected', this.name)
        console.log(this.$parent.name)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "var";
  .x-nav-item {
    padding: 10px 20px;
    position: relative;
    &:not(.vertical) {
      &.selected {
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
    &.vertical {
      &.selected {
        color: $blue;
      }
    }
  }

  .x-sub-nav .x-nav-item {
    &:not(.vertical) {
      &.selected {
        background: $grey;
        color: $color;
        &::after {
          display: none;
        }
      }
    }
    &.vertical {
      &.selected {
        color: $blue;
      }
    }
  }
</style>
