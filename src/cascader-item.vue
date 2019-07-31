<template>
  <div class="cascaderItem">
    {{sourceItem.name}}
    <cascader-item
      v-for="item in sourceItem.children"
      v-if="sourceItem.children"
      :sourceItem="item"
    ></cascader-item>
  </div>
</template>

<script>
  export default {
    name: 'cascaderItem',
    props: {
      sourceItem: {
        type: Object
      }
    }
  }
</script>

<style lang='scss' scoped>
.cascaderItem {
  border: 1px solid lavender;
  margin: 10px;
}
</style>