<template>
  <div>
    {{selected && selected[0] && selected[0].name || '空'}}
    {{selected && selected[1] && selected[1].name || '空'}}
    {{selected && selected[2] && selected[2].name || '空'}}
    <div style="padding: 20px">
      <x-cascader :source.sync="source"
                  popover-height="200px"
                  :selected.sync="selected"
                  @update:selected="xxx"
                  :load-data="loadData"
      ></x-cascader>
    </div>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import db from './db'

  function ajax (parent_id = 0) {
    return new Promise((success, fail) => {
      setTimeout(() => {
        let result = db.filter((item) => item.parent_id === parent_id)
        result.forEach(node => {
          if (db.filter(item => item.parent_id === node.id)) {
            node.isLeaf = false
          } else {
            node.isLeaf = true
          }
        })
        success(result)
      }, 1000)
    })
  }
  export default {
    name: '',
    components: {
      'x-cascader': Cascader
    },
    data() {
      return {
        selected: [],
        source: []
      }
    },
    created () {
      ajax(0).then((result) => {
        this.source = result
      })
      ajax(1).then((result) => {
        console.log(result)
      })
    },
    methods: {
      loadData(lastItem, updateSource) {
        let {name, id, parent_id} = lastItem
        ajax(id).then(result => {
          updateSource(result) // 回调，把别人传过来的函数执行
        })
      },
      xxx() {
        ajax(this.selected[0].id).then(result => {
          console.log(result)
          let lastLevelSelected = this.source.filter(item => item.id = this.selected[0].id)[0]
          this.$set(lastLevelSelected, 'children', result)
          // lastLevelSelected.children = result
          console.log(lastLevelSelected.children)
        })
      }
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --button-height: 32px;
    --font-size: 14px;
    --button-bg: #fff;
    --button-active-bg: #eee;
    --border-radius: 4px;
    --color: #999;
    --border-color: #999;
    --border-color-hover: #666;
  }

  #app {
  }

  body {
    font-size: var(--font-size);
  }
  .box {
    margin: 20px;
  }
</style>