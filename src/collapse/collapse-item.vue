<template>
  <div class="collapse-item" @click="toggle">
    <div class="title">
      {{title}}
    </div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'xCollapseItem',
    props: {
      title: {
        type: String,
        require: true
      },
      name: {
        type: String,
        require: true
      }
    },
    data () {
      return {
        open: false
      }
    },
    inject: ['eventBus'],
    mounted () {
      // 单向数据流
      this.eventBus && this.eventBus.$on('update:selected', (names) => {
        if (names.indexOf(this.name) > -1) { 
          this.open = true
        } else {
          this.open = false
        }
      })
    },
    methods: {
      toggle () {
        if (this.open) {
          this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
        } else {
          this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  $gray: #ddd;
  $border-radius: 4px;
  .collapse-item {
    > .title {
      border: 1px solid $gray;
      margin-top: -1px;
      margin-left: -1px;
      margin-right: -1px;
      min-height: 32px;
      display: flex;
      align-content: center;
      padding: 0 8px;
    }
    &:first-child {
      > .title {
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
      }
    }
    &:last-child {
      > .title:last-child {
        border-bottom-left-radius: $border-radius;
        border-bottom-right-radius: $border-radius;
      }
    }
    .content {
      padding: 8px;
    }
  }
</style>