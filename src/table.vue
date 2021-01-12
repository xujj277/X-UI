<template>
  <div class="x-table-wrapper" ref="wrapper">
    <div :style="{height, overflow: 'auto'}" ref="tableWrapper">
      <table class="x-table" :class="{bordered, compact, striped}" ref="table">
        <thead>
        <tr>
          <th v-if="expendField" :style="{width: '50px'}" class="x-table-center"></th>
          <th v-if="checkable" :style="{width: '50px'}" class="x-table-center">
            <input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemSelected">
          </th>
          <th :style="{width: '50px'}" v-if="numberVisible">#</th>
          <th :style="{width: column.width + 'px'}" v-for="column in columns" :key="column.field">
            <div class="x-table-header">
              {{column.text}}
              <span v-if="column.field in orderBy" class="x-table-sorter" @click="changeOrderBy(column.field)">
                <x-icon name="up" :class="{active: orderBy[column.field] === 'asc'}"/>
                <x-icon name="down" :class="{active: orderBy[column.field] === 'dsc'}"/>
              </span>
            </div>
          </th>
          <th ref="actionsHeader" v-if="$scopedSlots.default"></th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item, index) in dataSource">
          <tr :key="item.id">
            <td v-if="expendField" :style="{width: '50px'}" class="x-table-center">
              <x-icon class="x-table-expendIcon"
                      name="right"
                      @click="expendItem(item.id)"
              ></x-icon>
            </td>
            <td v-if="checkable" :style="{width: '50px'}" class="x-table-center">
              <input type="checkbox" @change="onChangeItem(item, index, $event)"
                     :checked="inSelectedItem(item)">
            </td>
            <td :style="{width: '50px'}" v-if="numberVisible">{{index + 1}}</td>
            <template v-for="column in columns">
              <td :style="{width: column.width + 'px'}" :key="column.field">
                <template v-if="column.render">
                  <vnodes :vnodes="column.render({value: item[column.field]})"></vnodes>
                </template>
                <template v-else>
                  {{item[column.field]}}
                </template>
              </td>
            </template>
            <td v-if="$scopedSlots.default">
              <div ref="actions" style="display: inline-block">
                <slot :item="item"></slot>
              </div>
            </td>
          </tr>
          <tr v-if="inExpendedIds(item.id)" :key="`${item.id}-expend`">
            <td :colspan="columns.length + expendCellColSpan">
              {{item[expendField] || '空'}}
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      <div v-if="loading" class="x-table-loading">
        <x-icon name="loading"></x-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import XIcon from './icon'
  export default {
    name: 'XTable',
    components: {
      XIcon,
      vnodes: {
        functional: true,
        render: (h, ctx) => ctx.props.vnodes
      }
    },
    data(){
      return {
        expendedIds: [],
        columns: []
      }
    },
    props: {
      expendField: {
        type: String
      },
      height: {
        type: Number
      },
      loading: {
        type: Boolean,
        default: false
      },
      selectedItems: {
        type: Array,
        default: () => []
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
      },
      checkable: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      this.columns = this.$slots.default.map(node => {
        let {text, field, width} = node.componentOptions.propsData
        let render = node.data.scopedSlots && node.data.scopedSlots.default
        return { text, field, width, render }
      })
      let result = this.columns[0].render({value: '方方'})
      console.log(result)

      let table2 = this.$refs.table.cloneNode(false)
      this.table2 = table2
      table2.classList.add('x-table-copy')
      let tHead = this.$refs.table.children[0]
      let {height} = tHead.getBoundingClientRect()
      this.$refs.tableWrapper.style.marginTop = height + 'px'
      this.$refs.tableWrapper.style.height = this.height - height + 'px'
      table2.appendChild(tHead)
      this.$refs.wrapper.appendChild(table2)

      console.log(this.$scopedSlots)

      if (this.$scopedSlots.default) {
        let div = this.$refs.actions[0]
        let {width}  = div.getBoundingClientRect()
        let parent = div.parentNode
        let styles = getComputedStyle(parent)
        let paddingLeft = styles.getPropertyValue('padding-left')
        let paddingRight = styles.getPropertyValue('padding-right')
        let borderLeft = styles.getPropertyValue('border-left')
        let borderRight = styles.getPropertyValue('border-right')
        const width2 = width + parseInt(paddingLeft) + parseInt(paddingRight) + parseInt(borderLeft) + parseInt(borderRight) + 'px'
        this.$refs.actionsHeader.style.width = width2
        this.$refs.actions.map((div) => {
          div.parentNode.style.width = width2
        })
      }
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.onWindowResize)
      this.table2.remove()
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
      },
      expendCellColSpan () {
        let result = 0
        if (this.checkable) {result += 1}
        if (this.expendField) {result += 1}
        return result
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
      inExpendedIds (id) {
        return this.expendedIds.indexOf(id) >= 0
      },
      expendItem (id) {
        if (this.inExpendedIds(id)) {
          this.expendedIds.splice(this.expendedIds.indexOf(id), 1)
        } else {
          this.expendedIds.push(id)
        }
      },
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
      overflow: auto;
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

    &-copy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
    }

    &-expendIcon {
      width: 10px;
      height: 10px;
    }

    & &-center {
      text-align: center;
    }
  }
</style>
