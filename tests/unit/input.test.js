import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Input from '@/input'

chai.use(sinonChai)

describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist
  })
  describe('porps', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })

    xit('接受 value', () => {
      const wrapper = mount(Input, {
        propsData: {
          value: '1234',
        },
      })
      wrapper.find('button').trigger('click')
      let classes = wrapper.find('.content-wrapper').classes()
      expect(classes).to.include('position-bottom')
    })
    it('接受 value', () => {
      vm = new Constructor({
        propsData: {
          value: '1234',
        },
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.value).to.eq('1234')
    })

    it('接受 disabled', () => {
      vm = new Constructor({
        propsData: {
          disabled: true,
        },
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.disabled).to.eq(true)
    })

    it('接受 readonly', () => {
      vm = new Constructor({
        propsData: {
          readonly: true,
        },
      }).$mount()
      const inputElement = vm.$el.querySelector('input')
      expect(inputElement.readOnly).to.eq(true)
    })

    it('接受 error', () => {
      vm = new Constructor({
        propsData: {
          error: '你错了',
        },
      }).$mount()
      const useElement = vm.$el.querySelector('use')
      expect(useElement.getAttribute('xlink:href')).to.eq('#icon-error')
      const errorMessage = vm.$el.querySelector('.errorMsg')
      expect(errorMessage.innerText).to.eq('你错了')
    })
  })
  describe('事件', () => {
    const Constructor = Vue.extend(Input)
    let vm
    afterEach(() => {
      vm.$destroy()
    })
    it('支持 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur'].forEach((eventName) => {
        vm = new Constructor({}).$mount()
        const callback = sinon.fake()
        vm.$on(eventName, callback)
        // 触发 input 的 change 事件
        let event = new Event(eventName)
        Object.defineProperty(event, 'target', {
          value: {
            value: 'hi'
          },
          enumerable: true
        })
        let inputElement = vm.$el.querySelector('input')
        inputElement.dispatchEvent(event)
        expect(callback).to.have.been.calledWith(event.target.value)
      })
    })


  })
})
