<template>
  <div>
    <x-button @click="onClick" icon="loading" icon-position="right" loading>按钮</x-button>
    <x-button @click="onClick" theme="primary">按钮</x-button>
    <x-button @click="onClick" theme="danger">按钮</x-button>
    <x-button @click="onClick" theme="text">按钮</x-button>
    <x-button @click="onClick" theme="link">按钮</x-button>
    <x-button @click="onClick" size="big">按钮</x-button>
    <x-button @click="onClick" size="small">按钮</x-button>
    <x-button @click="onClick" disabled>按钮</x-button>
    <x-button @click="onClick" theme="primary" size="big" disabled>按钮</x-button>
    <x-button @click="onClick" theme="danger" disabled>按钮</x-button>
    <x-button @click="onClick" theme="link" disabled>按钮</x-button>
    <x-button @click="onClick" theme="text" disabled>按钮</x-button>
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
