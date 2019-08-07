<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-item class="popover"
                     :items="source"
                     :height="popoverHeight"
      ></cascader-item>
    </div>
  </div>
</template>

<script>
  import CascaderItem from './cascader-item'
  export default {
    name: 'xCascader',
    components: { CascaderItem },
    props: {
      source: {
        type: Array
      },
      popoverHeight: {
        type: String
      }
    },
    data() {
      return {
        popoverVisible: false,
      }
    },
    computed: {
    }
  }
</script>

<style lang='scss' scoped>
  @import 'var';
  .cascader {
    position: relative;
    .trigger {
      border: 1px solid $border-color;
      height: 32px;
      width: 100px;
    }
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      background: #fff;
      @extend .box-shadow;
    }
  }
</style>