<template>
  <div>
    <x-button>默认按钮</x-button>
    <x-button icon="shezhi">带 icon 按钮</x-button>
    <x-button :loading="true">加载按钮</x-button>
    <x-button disabled>禁用按钮</x-button>
    <pre><code>{{content}}</code></pre>
  </div>
</template>

<script>
  import Button from '../../../src/button'
  export default {
    components: {
      xButton: Button
    },
    data () {
      return {
        content: `
          <x-button>默认按钮</x-button>
          <x-button icon="shezhi">带 icon 按钮</x-button>
          <x-button :loading="true">加载按钮</x-button>
          <x-button disabled>禁用按钮</x-button>
        `.replace(/\t+| +/g, '').trim()
      }
    }
  }
</script>

<style lang="scss" scoped></style>