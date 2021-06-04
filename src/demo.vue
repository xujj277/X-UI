<template>
  <div>
    <x-button @click="onClick" icon="loading" loading>按钮</x-button>
  </div>
</template>

<script>
import XButton from './button/button'
export default {
  name: 'demo',
  components: {
    XButton
  },
  data() {
    return {
    }
  },
  methods: {
    onClick () {
      console.log(1)
    }
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
