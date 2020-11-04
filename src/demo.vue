<template>
  <div>
    {{this.selected}}
    <div style="margin: 20px;">
      <x-table :columns="columns" :data-source="dataSource" bordered :selected-items.sync="selected"></x-table>
    </div>
    <div style="margin: 20px;">
      <x-table :columns="columns" :data-source="dataSource" compact :striped="false"></x-table>
    </div>
    <div style="margin: 20px;">
      <x-pager :total-page="10" :current-page.sync="currentPage"></x-pager>
    </div>
  </div>
</template>

<script>
  import XPager from './pager'
  import XTable from './table'
  export default {
    name: 'demo',
    components: { XPager, XTable },
    data() {
      return {
        currentPage: 1,
        selected: [],
        columns: [
          {text: '姓名', field: 'name'},
          {text: '分数', field: 'score'}
        ],
        dataSource: [
          {id: 1, name: 'xujinjun', score: 100},
          {id: 2, name: 'xjj', score: 99},
          {id: 3, name: 'xujin', score: 22},
          {id: 4, name: 'x', score: 3},
          {id: 5, name: 'xujun', score: 44},
          {id: 6, name: 'xj', score: 55},
          {id: 7, name: 'jinjun', score: 66},
          {id: 8, name: 'jj', score: 88},
        ]
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }
</style>