import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Layout from './layout'
import Header from './header'
import Sider from './sider'
import Content from './content'
import Footer from './footer'
import Toast from './toast'
import plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsPane from './tabs-pane'
import TabsItem from './tabs-item'
import Popover from './popover'

Vue.component('x-button', Button)
Vue.component('x-icon', Icon)
Vue.component('x-button-group', ButtonGroup)
Vue.component('x-input', Input)
Vue.component('x-row', Row)
Vue.component('x-layout', Layout)
Vue.component('x-header', Header)
Vue.component('x-sider', Sider)
Vue.component('x-content', Content)
Vue.component('x-footer', Footer)
Vue.component('x-toast', Toast)
Vue.component('x-tabs', Tabs)
Vue.component('x-tabs-head', TabsHead)
Vue.component('x-tabs-pane', TabsPane)
Vue.component('x-tabs-body', TabsBody)
Vue.component('x-tabs-item', TabsItem)
Vue.component('x-popover', Popover)
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    selectedTab: 'sports'
  },
  created () {
  },
  methods: {
  }
})

