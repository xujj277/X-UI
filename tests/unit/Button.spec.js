import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Button from '@/button.vue'
chai.use(sinonChai)

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
  xit('icon 默认的 order 是 1', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'shezhi',
      },
    })
    const vm = wrapper.vm
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('1')
  })
  xit('设置 iconPosition 可以改变 order', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'shezhi',
        iconPosition: 'right',
      },
    })
    const vm = wrapper.vm
    const icon = vm.$el.querySelector('svg')
    expect(getComputedStyle(icon).order).to.eq('2')
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
