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
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Cascader from './Cascader'

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
Vue.component('x-collapse', Collapse)
Vue.component('x-collapse-item', CollapseItem)
Vue.component('x-cascader', Cascader)
Vue.use(plugin)

new Vue({
  el: '#app',
  data: {
    source: [{
      name: '浙江',
      children: [
        {
          name: '杭州',
          children: [
            {name: '上城'},
            {name: '下城'},
            {name: '江干'}
          ]
        },
        {
          name: '嘉兴',
          children: [
            {name: '南湖区'},
            {name: '秀洲区'},
            {name: '嘉善县'}
          ]
        }
      ]
    },{
      name: '福建',
      children: [
        {
          name: '厦门市',
          children: [
            {name: '思明区'},
            {name: '海沧区'},
            {name: '湖里区'}
          ]
        }
      ]
    }]
  },
  created () {
  },
  methods: {
  }
})

