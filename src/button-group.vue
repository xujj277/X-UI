<template>
  <div class="x-button-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    mounted () {
      for (let node of this.$el.children) {
        let name = node.nodeName.toLowerCase()
        if (name !== 'button') {
          console.warn(`x-button-group 的子元素应该全部是 ${name}`)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.x-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .x-button {
    border-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
    &:hover {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
