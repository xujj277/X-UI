import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Vue from 'vue'
import Nav from '../../src/nav/nav'
import NavItem from '../../src/nav/nav-item'
import SubNav from '../../src/nav/sub-nav'
chai.use(sinonChai)


describe('Nav.vue', (done) => {
  it('存在.', () => {
    expect(Nav).to.exist
  })
  it('支持 selected 属性', (done) => {
    Vue.component('x-nav-item', NavItem)
    Vue.component('x-sub-nav', SubNav)
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home',
      },
      slots: {
        default: `
        <x-nav-item name="home">首页</x-nav-item>
        <x-sub-nav name="about">
          <template slot="title">关于</template>
          <x-nav-item name="culture">企业文化</x-nav-item>
        </x-sub-nav>
        <x-nav-item name="hire">招聘</x-nav-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true
      done()
    })
  })
  it('会触发 update:selected 事件', (done) => {
    Vue.component('x-nav-item', NavItem)
    Vue.component('x-sub-nav', SubNav)
    const callback = sinon.fake()
    const wrapper = mount(Nav, {
      propsData: {
        selected: 'home',
      },
      slots: {
        default: `
        <x-nav-item name="home">首页</x-nav-item>
        <x-sub-nav name="about">
          <template slot="title">关于</template>
          <x-nav-item name="culture">企业文化</x-nav-item>
        </x-sub-nav>
        <x-nav-item name="hire">招聘</x-nav-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      wrapper.find('[data-name="culture"]').trigger('click')
      expect(callback).to.have.been.calledWith('culture')
      console.log(wrapper.html())
      done()
    })
  })
})
