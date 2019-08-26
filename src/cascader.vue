<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-item class="popover"
                     :items="source"
                     :height="popoverHeight"
                     :selected="selected"
                     @update:selected="updateSelected"
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
      },
      selected: {
        type: Array,
        default: () => []
      },
      level: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        popoverVisible: false,
      }
    },
    computed: {
    },
    methods: {
      updateSelected(onSelected) {
        this.$emit('update:selected', onSelected)
      }
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