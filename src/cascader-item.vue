<template>
  <div class="cascaderItem" :style="{height: height}">
    <div class="left">
      <div class="label"
           v-for="item in items"
           @click="onClickLabel(item)"
      >
        <span class="name">{{item.name}}</span>
        <span class="icons">
          <icon class="next" v-if="rightArrowVisible(item)" name="right"></icon>
          <icon class="loading" name="loading"></icon>
        </span>
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
      },
      loadData: {
        type: Function
      }
    },
    computed: {
      rightItems () {
        if (this.selected[this.level]) {
          let selected = this.items.filter(item => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
      }
    },
    methods: {
      rightArrowVisible (item) {
        return this.loadData ? !item.isLeaf : item.children
      },
      onClickLabel(item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        copy.splice(this.level + 1) // 把后面的 selected 值都删掉
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
    /*padding: .3em 0;*/
    overflow: auto;
  }
  .right {
    height: 100%;
    border-left: 1px solid $border-color-light;
  }
  .label {
    padding: .5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-wrap: nowrap;
    &:hover {
      background-color: $grey;
    }
    > .name {
      margin-right: 1em;
      user-select: none;
    }
    .icons {
      margin-left: auto;
      justify-content: center;
      display: flex;
      align-items: center;
      .next {
        transform: scale(0.5);
      }
      .loading {
        animation: spin 2s infinite linear;
      }
    }
  }
}
</style>