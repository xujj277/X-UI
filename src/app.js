import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'

Vue.component('x-button', Button)
Vue.component('x-icon', Icon)
Vue.component('x-button-group', ButtonGroup)
Vue.component('x-input', Input)
Vue.component('x-row', Row)
Vue.component('x-col', Col)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: true,
    loading3: false
  },
  methods: {
    inputChange (e) {
      console.log(e.target.value)
    }
  }
})

