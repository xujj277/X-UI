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
      this.$children.forEach((vm) => {
        if (vm.$options.name === 'xTabsHead') {
          vm.$children.forEach((item) => {
            if (item.$options.name === 'xTabsItem' && item.name === this.selected) {
              this.eventBus.$emit('update:selected', this.selected, item)
            }
          })
        }
      })
    }
  }
</script>

<style lang='scss' scoped>
.tabs {

}
</style>