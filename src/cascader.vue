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
      loadData: {
        type: Function
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
      updateSelected(newSelected) {
        this.$emit('update:selected', newSelected)
        let lastItem = newSelected[newSelected.length - 1]
        let simplest = (children, id) => {
          return children.filter(item => item.id === id)[0]
        }
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
                found = complex(hasChildren, id)
                if (found) {
                  return found
                }
              }
            }
            return undefined
          }
        }
        let updateSource = (result) => {
          console.log(this.source)
          let copy = JSON.parse(JSON.stringify(this.source))
          let toUpdate = complex(copy, lastItem.id)
          toUpdate.children = result
          this.$emit('update:source', copy)

        }
        if (!lastItem.isLeaf) {
          this.loadData(lastItem, updateSource) // 回调，把别人传过来的函数执行
          // 调回调的时候传一个函数，这个函数理论上应该被调用
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