<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'xTabs',
    data() {
      return {
        eventBus: new Vue()
      }
    },
    props: {
      selected: {
        type: String,
        required: true
      },
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) >= 0
        }
      }
    },
    provide () {
      return {
        eventBus: this.eventBus
      }
    },
    mounted () {
      // this.$emit('update:selected', '这是this.$emit 出来的数据')
      this.eventBus.$emit('update:selected', this.selected)
    }
  }
</script>

<style lang='scss' scoped>
.tabs {

}
</style>