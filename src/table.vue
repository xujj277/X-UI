<template>
  <div class="x-table-wrapper">
    <table class="x-table" :class="{bordered, compact, striped}">
      <thead>
      <tr>
        <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemSelected"></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns" :key="column.field">
          <div class="x-table-header">
            {{column.text}}
            <span class="x-table-sorter" @click="changeOrderBy(column.field)">
              <x-icon name="up" :class="{active: orderBy[column.field] === 'asc'}"/>
              <x-icon name="down" :class="{active: orderBy[column.field] === 'dsc'}"/>
            </span>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in dataSource" :key="item.id">
        <th><input type="checkbox" @change="onChangeItem(item, index, $event)"
                   :checked="inSelectedItem(item)"
        ></th>
        <td v-if="numberVisible">{{index + 1}}</td>
        <template v-for="column in columns">
          <td :key="column.field">{{item[column.field]}}</td>
        </template>
      </tr>
      </tbody>
    </table>
    <div v-if="loading" class="x-table-loading">
      <x-icon name="loading"></x-icon>
    </div>
  </div>
</template>

<script>
  import XIcon from './icon'
  export default {
    name: 'XTable',
    components: {
      XIcon
    },
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      selectedItems: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        required: true
      },
      dataSource: {
        type: Array,
        required: true,
        validator (array) {
          return !(array.filter(item => item.id === undefined).length > 0)
        }
      },
      numberVisible: {
        type: Boolean,
        default: false
      },
      bordered: {
        type: Boolean,
        default: false
      },
      compact: {
        type: Boolean,
        default: false
      },
      striped: {
        type: Boolean,
        default: true
      },
      orderBy: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      areAllItemSelected () {
        const a = this.dataSource.map(item => item.id).sort()
        const b = this.selectedItems.map(item => item.id).sort()
        if (a.left !== b.length) {
          return false
        }
        let equal = true
        for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) {
          equal = false
          break
        }
        return equal
      }
    },
    watch: {
      selectedItems (val) {
        console.log(val)
        if (this.selectedItems.length === this.dataSource.length) {
          this.$refs.allChecked.indeterminate = false
        } else if (this.selectedItems.length === 0) {
          this.$refs.allChecked.indeterminate = false
          this.$refs.allChecked.checked = false
        } else {
          this.$refs.allChecked.indeterminate = true
        }
      }
    },
    methods: {
      changeOrderBy (key) {
        const copy = JSON.parse(JSON.stringify(this.orderBy))
        let oldValue = copy[key]
        if (oldValue === 'asc') {
          copy[key] = 'dsc'
        } else if (oldValue === 'dsc') {
          copy[key] = true
        } else {
          copy[key] = 'asc'
        }
        this.$emit('update:orderBy', copy)
      },
      onChangeItem (item, index, e) {
        let selected = e.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        if (selected) {
          copy.push(item)
        } else {
          copy = copy.filter(i => i.id !== item.id)
        }
        this.$emit('update:selectedItems', copy)
      },
      onChangeAllItems(e) {
        let selected = e.target.checked
        this.$emit('update:selectedItems', selected ? this.dataSource : [])
      },
      inSelectedItem (item) {
        return this.selectedItems.filter((i) => i.id === item.id).length > 0
      }
    }
  }
</script>™

<style lang='scss' scoped>
  @import "var";
  $grey: darken($grey, 10%);
  .x-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;

    &.bordered {
      border: 1px solid $grey;

      td, th {
        border: 1px solid $grey;
      }
    }

    &.compact {
      td, th {
        padding: 4px;
      }
    }

    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }
          &:nth-child(even) {
            background: lighten($grey, 10%);
          }
        }
      }
    }

    td, th {
      border-bottom: 1px solid $grey;
      text-align: left;
      padding: 8px;
    }

    &-sorter {
      display: inline-flex;
      flex-direction: column;
      margin: 0 4px;
      cursor: pointer;

      svg {
        width: 10px;
        height: 10px;
        fill: $grey;

        &.active {
          fill: red
        }

        &:first-child {
          position: relative;
          bottom: -1px;
        }

        &:nth-child(2) {
          position: relative;
          top: -1px;
        }
      }
    }

    &-header {
      display: flex;
      align-items: center;
    }

    &-wrapper {
      position: relative;
    }

    &-loading {
      position: absolute;
      left: 0;
      top: 0;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      svg {
        width: 50px;
        height: 50px;
        @include spin;
      }
    }
  }
</style>
