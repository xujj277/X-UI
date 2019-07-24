<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'xCollapse',
  }
</script>

<style lang='scss' scoped>
  $gray: #ddd;
  $border-radius: 4px;
  .collapse {
    border: 1px solid $gray;
    border-radius: $border-radius;
  }
</style>