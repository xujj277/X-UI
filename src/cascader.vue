<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{result || '&nbsp'}}
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
    },
    computed: {
      result() {
        return this.selected.map((item) => item.name).join('/')
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
      display: inline-flex;
      align-items: center;
      height: $input-height;
      padding: 0 1em;
      min-width: 10em;
      border-radius: $border-radius;
    }
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      background: #fff;
      margin-top: 8px;
      @extend .box-shadow;
    }
  }
</style>