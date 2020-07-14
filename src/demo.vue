<template>
  <div>
    <div style="padding: 20px">
      <x-cascader :source.sync="source"
                  popover-height="200px"
                  :selected.sync="selected"
                  :load-data="loadData"
      ></x-cascader>
    </div>
    <x-popover>
      <template>
        <button>点我</button>
      </template>
      <template slot="content">
        弹出内容
      </template>
    </x-popover>
  </div>
</template>

<script>
  import Cascader from './cascader'
  import Popover from './popover'
  import db from './db'
  import removeListener from './click-outside'

  function ajax (parent_id = 0) {
    return new Promise((success, fail) => {
      setTimeout(() => {
        let result = db.filter((item) => item.parent_id === parent_id)
        result.forEach(node => {
          if (db.filter(item => item.parent_id === node.id).length > 0) {
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
    name: 'demo',
    components: {
      'x-cascader': Cascader,
      'x-popover': Popover
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
    },
    methods: {
      loadData({id}, updateSource) {
        ajax(id).then(result => {
          updateSource(result) // 回调，把别人传过来的函数执行
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

  /*:root {*/
  /*  --button-height: 32px;*/
  /*  --font-size: 14px;*/
  /*  --button-bg: #fff;*/
  /*  --button-active-bg: #eee;*/
  /*  --border-radius: 4px;*/
  /*  --color: #999;*/
  /*  --border-color: #999;*/
  /*  --border-color-hover: #666;*/
  /*}*/

  html {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }
  img {
    max-width: 14px;
  }
</style>