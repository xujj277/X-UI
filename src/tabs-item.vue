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
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name;
      })
    },
    methods: {
      xxx() {
        this.eventBus.$emit('update:selected', this.name)
      }
    }
  }
</script>

<style lang='scss' scoped>
  .tabs-item {
    flex-shrink: 0;
    padding: 0 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: 1px solid green;
    &.active {
      background: red;
    }
  }
</style>