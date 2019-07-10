<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xTabsHead',
    inject: ['eventBus'],
    created () {
      this.$emit('update:selected', '这是this.$emit 出来的数据')
    }
  }
</script>

<style lang='scss' scoped>
  $tab-height: 40px;
  .tabs-head {
    display: flex;
    height: $tab-height;
    justify-content: flex-start;
    align-content: center;
    border: 1px solid;
    > .actions-wrapper {
      margin-left: auto;
    }
  }
</style>