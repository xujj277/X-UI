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
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: true,
    loading3: false
  },
  created () {
    this.$toast('qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看qwlkejfql;wkej拉少见多怪来看', {
      enableHtml: true
    })
  },
  methods: {
    clickToast () {
      this.$toast('我是 message')
    }
  }
})

