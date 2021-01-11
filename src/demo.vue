<template>
  <div>
    <x-table ></x-table>
  </div>
</template>

<script>
  import xTable from './table'

  export default {
    name: 'demo',
    components: { xTable },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    --font-size: 14px;
  }

  body {
    font-size: var(--font-size);
  }
</style>