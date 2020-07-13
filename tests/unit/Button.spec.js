import chia,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chia.use(sinonChai)
import { shallowMount, mount } from '@vue/test-utils'
import Button from '@/button.vue'
import Vue from 'vue'

describe('Button.vue', () => {
  it('存在.', () => {
    expect(Button).to.be.ok
  })
  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'shezhi',
      },
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.eq('#icon-shezhi')
  })
  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'shezhi',
        loading: true,
      },
    })
    const vm = wrapper.vm
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements.length).to.equal(1)
    expect(useElements[0].getAttribute('xlink:href')).to.eq('#icon-loading')
  })
  it('icon 默认的 order 是 1', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'shezhi',
      },
    }).$mount(div)
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('1')
    vm.$el.remove()
    vm.$destroy()
  })
  it('设置 iconPosition 可以改变 order', () => {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
      propsData: {
        icon: 'shezhi',
        iconPosition: 'right',
      },
    }).$mount(div)
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
  })
  it('点击 button 触发 click 事件', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'shezhi',
      },
    })
    const vm = wrapper.vm

    const callback = sinon.fake() // 假函数看有没有被调用
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called
  })
})
