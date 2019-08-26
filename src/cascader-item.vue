<template>
  <div class="cascaderItem" :style="{height: height}">
    <div class="left">
      <div class="label"
           v-for="item in items"
           @click="onClickLabel(item)"
      >
      {{item.name}}
        <icon class="icon" v-if="item.children" name="shezhi"></icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <x-cascader-item :items="rightItems"
                       :height="height"
                       :level="level+1"
                       :selected="selected"
                       @update:selected="updateSelected"
      ></x-cascader-item>
    </div>
  </div>
</template>

<script>
  import Icon from './icon'
  export default {
    name: 'xCascaderItem',
    components: {
      Icon
    },
    props: {
      items: {
        type: Array
      },
      height: {
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
    computed: {
      rightItems () {
        let currentSelected = this.selected[this.level]
        if (currentSelected && currentSelected.children) {
          return currentSelected.children
        } else {
          return null
        }
      }
    },
    methods: {
      onClickLabel(item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        this.$emit('update:selected', copy)
      },
      updateSelected(onSelected) {
        this.$emit('update:selected', onSelected)
      }
    }
  }
</script>

<style lang='scss' scoped>
  @import "var";
.cascaderItem {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100px;
  .left {
    height: 100%;
    padding: .3em 0;
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
  .label {
    padding: .3em 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      margin-left: 1em;
      transform: scale(0.5);
    }
  }
}
</style>