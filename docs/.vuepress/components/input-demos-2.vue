<template>
  <div style="padding-top: 16px;">
    <h2>双向绑定</h2>
    <p>
      <strong>预览</strong>
    </p>
    <x-input v-model="value"></x-input>
    <div>
      value: {{value}}
    </div>
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
        value: '1',
        content: `
          data: {
            value: 1
          }

          <x-input v-model="value"></x-input>
          <div>
            value: {{value}}
          </div>
        `.replace(/\t+| +/g, '').trim()
      }
    }
  }
</script>

<style lang='scss' scoped></style>