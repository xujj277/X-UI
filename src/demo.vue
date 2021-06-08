<template>
  <div>
    <XButton @click="onClick">show dialog</XButton>
    <x-dialog :visible.sync="visible"
              :closeOnClickOverlay="false"
              :ok="handleOk"
              :cancel="handleCancel"
    >
      <template slot="title">xxx</template>
      <template slot="content">1111</template>
    </x-dialog>
    <XButton @click="
const { openDialog } = require('./dialog/openDialog') 
openDialog">show dialog2</XButton>
    <x-slides :selected.sync="selected">
      <x-slides-item name="1">
        <div class="box">1</div>
      </x-slides-item>
      <x-slides-item name="2">
        <div class="box">2</div>
      </x-slides-item>
      <x-slides-item name="3">
        <div class="box">3</div>
      </x-slides-item>
    </x-slides>
  </div>
</template>

<script>
import XButton from './button/button'
import XDialog from './dialog/dialog'
import XSlides from './slides/slides'
import XSlidesItem from './slides/slides-item'
export default {
  name: 'demo',
  components: {
    XSlides,
    XDialog,
    XButton,
    XSlidesItem
  },
  data() {
    return {
      visible: false,
      selected: '2'
    }
  },
  methods: {
    onClick () {
      this.visible = true
    },
    handleOk () {
      console.log(1)
      return false
    },
    handleCancel () {
      console.log(0)
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
