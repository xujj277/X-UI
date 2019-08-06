<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-item :items="source"></cascader-item>
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
      }
    },
    data() {
      return {
        popoverVisible: false,
        level1Selected: null
      }
    },
    computed: {
      level2Selected () {
        if (this.level1Selected) {
          return this.level1Selected.children
        } else {
          return []
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import 'var';
  .cascader {
    .trigger {
      border: 1px solid lavender;
      height: 32px;
      width: 100px;
    }
    .popover {
      border: 1px solid lavender;
      height: 200px;
      width: 80px;
    }
  }
</style>