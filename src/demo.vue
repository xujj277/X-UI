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
    <XButton @click="openDialog">show dialog2</XButton>
    <XButton @click="showToast">show toast</XButton>
    <x-tabs :selected.sync="selectedTab">
      <x-tabs-head>
        <template slot="actions">
          <button>设置</button>
        </template>
        <x-tabs-item name="woman" disabled>ccc</x-tabs-item>
        <x-tabs-item name="sports">111</x-tabs-item>
        <x-tabs-item name="sport">222</x-tabs-item>
      </x-tabs-head>
      <x-tabs-body>
        <x-tabs-pane name="woman">222</x-tabs-pane>
        <x-tabs-pane name="sports">333</x-tabs-pane>
        <x-tabs-pane name="sport">544</x-tabs-pane>
      </x-tabs-body>
    </x-tabs>
    <x-input :value="value" @change="onChange1" :error="xx" placeholder="12213123"></x-input>
    <xToast v-if="isToastVisible" enable-html><ul>asdf</ul></xToast>
  </div>
</template>

<script>
import XButton from './button/button'
import XDialog from './dialog/dialog'
import XSlides from './slides/slides'
import XSlidesItem from './slides/slides-item'
import dialog from './dialog/openDialog'
import xTabs from './tabs/tabs'
import xTabsBody from './tabs/tabs-body'
import xTabsHead from './tabs/tabs-head'
import xTabsItem from './tabs/tabs-item'
import xTabsPane from './tabs/tabs-pane'
import xInput from './input'
import xToast from './toast'
import Vue from 'vue'
import plugin from './plugin'
Vue.use(plugin)

Vue.use(dialog)

export default {
  name: 'demo',
  components: {
    XSlides,
    XDialog,
    XButton,
    XSlidesItem,
    xTabs,
    xTabsBody,
    xTabsHead,
    xTabsItem,
    xTabsPane,
    xInput,
    xToast
  },
  data () {
    return {
      visible: false,
      selected: '2',
      selectedTab: 'sport',
      xx: '',
      value: '',
      isToastVisible: false
    }
  },
  methods: {
    onChange1 (value) {
      this.value = value
      this.xx = '111'
    },
    onClick () {
      this.visible = true
    },
    handleOk () {
      return false
    },
    handleCancel () {
    },
    openDialog () {
      this.$dialog('xxx', '111', {
        visible: true,
        ok: () => {console.log(1)},
        cancel: () => {console.log(0)}
      })
    },
    showToast () {
      // this.isToastVisible = true
      this.$toast( `<strong>hi</strong>  hi`, {
        position: 'top',
        enableHtml: true,
        closeButton: false,
        autoClose: 3,
      })
    }
  },
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
