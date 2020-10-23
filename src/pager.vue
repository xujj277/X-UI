<template>
  <div class="x-pager">
    <span class="x-pager-nav prev" :class="{disabled: currentPage === 1}">
      <x-icon name="left"></x-icon>
    </span>
    <template v-for="page in pages">
      <template v-if="page === currentPage">
        <span class="x-pager-item current">{{page}}</span>
      </template>
      <template v-else-if="page === '...'">
        <x-icon class="x-pager-separator" name="dots">?</x-icon>
      </template>
      <template v-else>
        <span class="x-pager-item other">{{page}}</span>
      </template>
    </template>
    <span class="x-pager-nav next" :class="{disabled: currentPage === totalPage}">
      <x-icon name="right"></x-icon>
    </span>
  </div>
</template>

<script>
  import XIcon from './icon'
  export default {
    name: 'xPager',
    components: {
      XIcon
    },
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
        .filter((n) => n >= 1 && n <= this.totalPage)
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
    $width: 20px;
    $height: 20px;
    $font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-item {
      border: 1px solid #e1e1e1;
      border-radius: $border-radius;
      padding: 0 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size;
      min-width: $width;
      height: $height;
      margin: 0 4px;
      cursor: pointer;
      &.current, &:hover {
        border-color: $blue;
      }
      &.current {
        cursor: default;
      }
    }
    &-separator {
      width: $width;
      font-size: $font-size;
    }
    &-nav {
      margin: 0 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: $grey;
      width: $width;
      height: $height;
      border-radius: $border-radius;
      font-size: $font-size;

      &.disabled {
        svg {
          fill: darken($grey, 30%);
        }
      }
    }
  }
</style>
