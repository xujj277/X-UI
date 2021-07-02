<template>
  <div class="tabs-pane" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'xTabsPane',
    inject: ['eventBus'],
    data () {
      return {
        active: false
      }
    },
    props: {
      name: {
        type: [String, Number],
        required: true
      }
    },
    created () {
      this.eventBus && this.eventBus.$on('update:selected', (name, vm) => {
        this.active = name === this.name
      })
    }
  }
</script>

<style lang='scss' scoped>
  .tabs-pane {
    padding: 1em;
  }
</style>