<template>
  <div class="x-pager">
    <span v-for="page in pages"
          class="x-pager-item"
          :class="{active: page === currentPage, separator: page === '...'}"
    >
      {{page}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'xPager',
    props: {
      totalPage: {
        type: Number,
        require: true
      },
      currentPage: {
        type: Number,
        require: true
      },
      hideIfOnePage: {
        type: Boolean,
        default: true
      }
    },
    data() {
      let pages = unique([1, this.totalPage,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
        this.currentPage - 1,
        this.currentPage - 2]
        .sort((a, b) => a - b))
        .reduce((pre, cur, index, array) => {
          pre.push(cur)
          array[index + 1] !== undefined && array[index + 1] - array[index] > 1 && pre.push('...')
          return pre
        }, [])
      return {
        pages
      }
    },
  }
  function unique (array) {
    const object = {}
    array.map((number) => {
      object[number] = true
    })
    return Object.keys(object).map((s) => parseInt(s, 10))
  }
</script>

<style lang='scss' scoped>
  @import 'var';
  .x-pager {
    &-item {
      border: 1px solid #e1e1e1;
      border-radius: $border-radius;
      padding: 0 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      min-width: 20px;
      height: 20px;
      margin: 0 4px;
      cursor: pointer;
      &.active, &:hover {
        border-color: $blue;
      }
      &.active {
        cursor: default;
      }
      &.separator {
        border: none;
      }
    }

  }
</style>
