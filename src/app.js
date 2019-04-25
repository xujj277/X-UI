import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('x-button', Button)
Vue.component('x-icon', Icon)
Vue.component('x-button-group', ButtonGroup)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false
  }
})

// 单元测试
import chai from 'chai'
import spies from 'chai-spies'
chai.use(spies)

const expect = chai.expect
// 测 icon
{
  const Constuctor = Vue.extend(Button)
  const vm = new Constuctor({
    propsData: {
      icon: 'shezhi'
    }
  })
  vm.$mount()
  let useElement = vm.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#icon-shezhi')
  vm.$el.remove()
  vm.$destroy()
}
// 测 loading
{
  const Constuctor = Vue.extend(Button)
  const vm = new Constuctor({
    propsData: {
      icon: 'shezhi',
      loading: true
    }
  })
  vm.$mount()
  let useElement = vm.$el.querySelector('use')
  let href = useElement.getAttribute('xlink:href')
  expect(href).to.eq('#icon-loading')
  vm.$el.remove()
  vm.$destroy()
}
// 测 位置
{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constuctor = Vue.extend(Button)
  const vm = new Constuctor({
    propsData: {
      icon: 'shezhi'
    }
  })
  vm.$mount(div)
  let svg = vm.$el.querySelector('svg')
  let {order} = window.getComputedStyle(svg)
  expect(order).to.eq('1')
  vm.$el.remove()
  vm.$destroy()
}
{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constuctor = Vue.extend(Button)
  const vm = new Constuctor({
    propsData: {
      icon: 'shezhi',
      iconPosition: 'right'
    }
  })
  vm.$mount(div)
  let svg = vm.$el.querySelector('svg')
  let {order} = window.getComputedStyle(svg)
  expect(order).to.eq('2')
  vm.$el.remove()
  vm.$destroy()
}

// 测 点击
{
  // mock
  const Constuctor = Vue.extend(Button)
  const vm = new Constuctor({
    propsData: {
      icon: 'shezhi'
    }
  })
  vm.$mount()
  let spy = chai.spy(function () {})
  vm.$on('click', spy)
  // 希望这个函数被执行
  let button = vm.$el
  button.click()
  expect(spy).to.have.been.called()
  vm.$el.remove()
  vm.$destroy()
}


