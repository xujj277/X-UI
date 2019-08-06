<template>
  <div class="cascaderItem">
    <div class="left">
      <div class="label"
           v-for="item in items"
           style="border: 1px solid red"
           @click="leftSelected = item"
      >
      {{item.name}}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <x-cascader-item :items="rightItems"></x-cascader-item>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xCascaderItem',
    props: {
      items: {
        type: Array
      }
    },
    data() {
      return {
        leftSelected: null
      }
    },
    computed: {
      rightItems () {
        if (this.leftSelected && this.leftSelected.children) {
          return this.leftSelected.children
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left {
    border: 1px solid red;
  }
  .right {
    margin-top: -1px;
  }
}
</style>