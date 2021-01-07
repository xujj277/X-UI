<template>
  <div style="display:flex; justify-content:center;">
    <div style="width: 600px; border: 1px solid black;">
      <p>段落1</p>
      <p>段落2</p>
      <p>段落3</p>
      <p>段落4</p>
      <p>段落5</p>
      <p>段落6</p>
      <x-sticky :distance="10">
        <div style="border: 1px solid red">
          我是粘粘内容
        </div>
      </x-sticky>
      <p>段落1</p>
      <p>段落2</p>
      <p>段落3</p>
      <p>段落4</p>
      <p>段落5</p>
      <p>段落6</p>
      <p>段落7</p>
      <p>段落8</p>
      <p>段落9</p>
    </div>
  </div>
</template>

<script>
  import xSticky from './sticky'

  export default {
    name: 'demo',
    components: { xSticky },
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