<template>
  <div class="row" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'xRow',
    props: {
      gutter: {
        type: [Number, String]
      },
      align: {
        type: String,
        validator (value) {
          return ['left', 'right', 'center'].indexOf(value) >= 0
        }
      }
    },
    mounted () {
      // 将 gutter 传到每一个子组件里面
      this.$children.forEach((vm) => {
        vm.gutter = this.gutter
      })
    },
    computed: {
      rowStyle () {
        let {gutter} = this
        return {
          marginLeft: -gutter/2 + 'px', marginRight: -gutter/2 + 'px'
        }
      },
      rowClass () {
        let {align} = this
        return [align && `align-${align}`]
      }
    }
  }
</script>

<style scoped lang="scss">
  .row {
    display: flex;
    &.align-left {
      justify-content: flex-start;
    }
    &.align-right {
      justify-content: flex-end;
    }
    &.align-center {
      justify-content: center;
    }
  }
</style>
