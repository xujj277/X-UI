<template>
  <div>
    <x-switch :value.sync="y"></x-switch>
    <x-switch :value.sync="y1" active-color="#13ce66" inactive-color="grey"/>
    <x-switch :value.sync="y2" active-color="#13ce66" inactive-color="#ff4949"/>
    <x-switch disabled :value.sync="y3" active-color="#13ce66" inactive-color="#ff4949"/>
    <x-switch is-wave-animation :value.sync="y4" active-color="#13ce66" inactive-color="#ff4949"/>
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
      y: false,
      y1: false,
      y2: true,
      y3: false,
      y4: false
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
