<template>
  <div>
    {{selected && selected[0] && selected[0].name || '空'}}
    {{selected && selected[1] && selected[1].name || '空'}}
    {{selected && selected[2] && selected[2].name || '空'}}
    <div style="padding: 20px">
      <x-cascader :source="source"
                  popover-height="200px"
                  :selected.sync="selected"
      ></x-cascader>
    </div>
  </div>
</template>

<script>
  import Button from './button'
  import Cascader from './cascader'
  import db from './db'

  function ajax (parent_id = 0) {
    return db.filter((item) => item.parent_id === parent_id)
  }

  console.log(ajax())
  export default {
    name: '',
    components: {
      'x-button': Button,
      'x-cascader': Cascader
    },
    data() {
      return {
        selected: [],
        source: ajax()
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