<template>
  <div>
    {{selected && selected[0] && selected[0].name || '空'}}
    {{selected && selected[1] && selected[1].name || '空'}}
    {{selected && selected[2] && selected[2].name || '空'}}
    <x-cascader :source="source"
                popover-height="200px"
                :selected="selected"
                @update:selected="selected = $event"
    ></x-cascader>
  </div>
</template>

<script>
  import Button from './button'
  import Cascader from './cascader'
  export default {
    name: '',
    components: {
      'x-button': Button,
      'x-cascader': Cascader
    },
    data() {
      return {
        selected: [],
        source: [{
          name: '浙江',
          children: [
            {
              name: '杭州',
              children: [
                {name: '上城'},
                {name: '下城'},
                {name: '江干'}
              ]
            },
            {
              name: '嘉兴',
              children: [
                {name: '南湖区'},
                {name: '秀洲区'},
                {name: '嘉善县'}
              ]
            }
          ]
        },{
          name: '福建',
          children: [
            {
              name: '厦门市',
              children: [
                {name: '思明区'},
                {name: '海沧区'},
                {name: '湖里区'}
              ]
            }
          ]
        }, {
          name: '安徽',
          children: [
            {
              name: '合肥',
              children: [
                {name: '卢阳'},
                {name: '珠海'}
              ]
            }
          ]
        }]
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