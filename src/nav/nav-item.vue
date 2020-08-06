<template>
  <div class="x-nav-item" :class="{selected}" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'XNavItem',
    inject: ['root'],
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
        this.$emit('add:selected', this.name)
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

  .x-sub-nav .x-nav-item {
    &.selected {
      background: $grey;
      color: $color;
      &::after {
        display: none;
      }
    }
  }
</style>
