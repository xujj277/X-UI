<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'xTabs',
  data () {
    return {
      eventBus: new Vue(), // 媒介
    }
  },
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  provide () {
    return {
      eventBus: this.eventBus,
    }
  },
  methods: {
    checkChildren () {
      if (!this.$children.length) {
        console && console.warn && console.warn('tabs的子组件应该是tabs-head和tabs-nav，但你没有写子组件')
      }
    },
    selectTab () {
      this.$children.forEach(vm => {
        if (vm.$options.name === 'xTabsHead') {
          vm.$children.forEach(item => {
            if (item.$options.name === 'xTabsItem' && item.name === this.selected) {
              this.eventBus.$emit('update:selected', this.selected, item)
            }
          })
        }
      })
    },
  },
  mounted () {
    this.checkChildren()
    this.selectTab()
  },
}
</script>
