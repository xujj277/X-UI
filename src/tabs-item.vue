<template>
  <div class="tabs-item" @click="xxx" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'xTabsItem',
    inject: ['eventBus'],
    data() { // 不需要开发者传值，自身维护
      return {
        active: false
      }
    },
    props: { // 需要开发者传值
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String|Number,
        require: true
      }
    },
    computed: {
      classes () {
        return {
          active: this.active
        }
      }
    },
    created: function () {
      this.eventBus && this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name;
      })
    },
    methods: {
      xxx() {
        this.eventBus && this.eventBus.$emit('update:selected', this.name, this)
      }
    }
  }
</script>

<style lang='scss' scoped>
  $blue: blue;
  .tabs-item {
    flex-shrink: 0;
    padding: 0 1em;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    &.active {
      color: $blue;
      font-weight: bold;
    }
  }
</style>