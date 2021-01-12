<template>
  <div>
    {{this.selected}}
    <div style="margin: 20px;">
      <x-table :data-source="dataSource"
               bordered
               :selected-items.sync="selected"
               :order-by.sync="orderBy"
               :loading="loading"
               @update:orderBy="x"
               :height="400"
               expend-field="description"
      >
        <x-table-column text="姓名" field="name" :width="100">
          <template slot-scope="props">
            <a href="#">{{props.value}}</a>
          </template>
        </x-table-column>
        <x-table-column text="分数" field="score"></x-table-column>
      </x-table>
    </div>
  </div>
</template>

<script>
import XPager from './pager'
import XTable from './table'
import XTableColumn from './table-column'
export default {
  name: 'demo',
  components: { XPager, XTable, XTableColumn },
  data() {
    return {
      currentPage: 1,
      selected: [],
      orderBy: {
        // name: 'dsc',
        score: ''
      },
      dataSource: [
        {id: 1, name: 'xujinjun', score: 100, description: 'xxxx yyyy'},
        {id: 2, name: 'xjj', score: 99, description: 'iiiiiii yyyy'},
        {id: 3, name: 'xujin', score: 22},
        {id: 4, name: 'x', score: 3},
        {id: 5, name: 'xujun', score: 44},
        {id: 6, name: 'xj', score: 55},
        {id: 7, name: 'jinjun', score: 66},
        {id: 9, name: 'jj', score: 88},
        {id: 10, name: 'xujinjun', score: 100},
        {id: 21, name: 'xjj', score: 99},
        {id: 31, name: 'xujin', score: 22},
        {id: 41, name: 'x', score: 3},
        {id: 51, name: 'xujun', score: 44},
        {id: 61, name: 'xj', score: 55},
        {id: 71, name: 'jinjun', score: 66},
        {id: 81, name: 'jj', score: 88},
        {id: 411, name: 'x', score: 3},
        {id: 511, name: 'xujun', score: 44},
        {id: 611, name: 'xj', score: 55},
        {id: 711, name: 'jinjun', score: 66},
        {id: 811, name: 'jj', score: 88},
      ],
      loading: false
    }
  },
  methods: {
    edit (item) {
      alert(`开始编辑${item.id}`)
    },
    view (item) {
      alert(`开始查看${item.id}`)
    },
    x () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.dataSource = this.dataSource.sort((a, b) => {
          return a.score - b.score
        })
      }, 1000)
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
html {
  --font-size: 14px;
}
body {
  font-size: var(--font-size);
}
</style>