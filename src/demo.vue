<template>
  <div>
    <x-data-picker :value="d" @input="d = $event"></x-data-picker>
  </div>
</template>

<script>
import XDataPicker from './data-picker/data-picker'
export default {
  name: 'demo',
  components: { XDataPicker },
  data() {
    return {
      d: new Date(2021, 3, 12)
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