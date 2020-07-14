<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{result || '&nbsp;'}}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-item class="popover"
                     :items="source"
                     :height="popoverHeight"
                     :selected="selected"
                     @update:selected="onUpdateSelected"
                     :load-data="loadData"
                     :loading-item="loadingItem"
      ></cascader-item>
    </div>
  </div>
</template>

<script>
  import CascaderItem from './cascader-item'
  import ClickOutside from './click-outside'
  export default {
    name: 'xCascader',
    components: { CascaderItem },
    directives: { ClickOutside },
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
      loadData: {
        type: Function
      }
    },
    data() {
      return {
        popoverVisible: false,
        loadingItem: {} // 用来处理 loading icon 的
      }
    },
    methods: {
      onClickDocument (e) {
        let {cascader} = this.$refs
        let {target} = e
        if (cascader === target || cascader.contains(target)) {
          return
        }
        this.close()
      },
      open() {
        this.popoverVisible = true
      },
      close () {
        this.popoverVisible = false
      },
      toggle () {
        if (this.popoverVisible) {
          this.close()
        } else {
          this.open()
        }
      },
      onUpdateSelected(newSelected) {
        this.$emit('update:selected', newSelected)
        // 最后一项
        let lastItem = newSelected[newSelected.length - 1]
        let simplest = (children, id) => {
          return children.filter(item => item.id === id)[0]
        }
        /**
         * 把复杂的变成简单的搜索
         * @param children
         * @param id
         * @returns {undefined|*}
         */
        let complex = (children, id) => {
          let noChildren = []
          let hasChildren = []
          children.forEach(item => {
            if (item.children) {
              hasChildren.push(item)
            } else {
              noChildren.push(item)
            }
          })
          let found = simplest(noChildren, id)
          if (found) {
            return found
          } else {
            found = simplest(hasChildren, id)
            if (found) return found
            else {
              for (let i = 0; i < hasChildren.length; i++) {
                found = complex(hasChildren[i].children, id)
                if (found) {
                  return found
                }
              }
            }
            return undefined
          }
        }
        let updateSource = (result) => {
          this.loadingItem = {}
          let copy = JSON.parse(JSON.stringify(this.source))
          let toUpdate = complex(copy, lastItem.id)
          toUpdate.children = result
          this.$emit('update:source', copy)

        }
        if (!lastItem.isLeaf && this.loadData) {
          this.loadData(lastItem, updateSource) // 回调，把别人传过来的函数执行
          // 调回调的时候传一个函数，这个函数理论上应该被调用
          this.loadingItem = lastItem
        }
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
    display: inline-block;
    .trigger {
      border: 1px solid $border-color;
      display: inline-flex;
      align-items: center;
      height: $input-height;
      padding: 0 1em;
      min-width: 10em;
      border-radius: $border-radius;
      background: #fff;
    }
    .popover-wrapper {
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      background: #fff;
      margin-top: 8px;
      @extend .box-shadow;
      z-index: 1;
    }
  }
</style>