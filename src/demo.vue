<template>
  <div>
    <x-switch :value.sync="y"></x-switch>
  </div>
</template>

<script>
import XSwitch from './switch'
export default {
  name: 'demo',
  components: {
    XSwitch
  },
  data() {
    return {
      y: false
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
