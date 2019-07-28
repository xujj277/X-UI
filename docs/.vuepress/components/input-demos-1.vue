<template>
  <div style="padding-top: 16px;">
    <h2>简单用法</h2>
    <p>
      <strong>预览</strong>
    </p>
    <x-input value="中文"></x-input>
    <x-input value="中文" disabled></x-input>
    <x-input value="中文" readonly></x-input>
    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>

<script>
  import Input from '../../../src/input'
  export default {
    components: {
      xInput: Input
    },
    data () {
      return {
        content: `
        <x-input value="中文"></x-input>
    <x-input value="中文" disabled></x-input>
    <x-input value="中文" readonly></x-input>
        `.replace(/\t+| +/g, '').trim()
      }
    }
  }
</script>

<style lang='scss' scoped></style>