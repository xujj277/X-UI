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
  </div>
</template>

<script>
import XButton from './button/button'
import XDialog from './dialog/dialog'
export default {
  name: 'demo',
  components: {
    XDialog,
    XButton
  },
  data() {
    return {
      visible: false
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
