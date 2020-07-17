import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Slides from '@/slides.vue'
import SlidesItem from '@/slides-item.vue'
import Vue from 'vue'
chai.use(sinonChai)

describe('Slides.vue', () => {
  it('存在.', () => {
    expect(Slides).to.be.ok
  })
  it('接受 XSlidesItem，默认展示第一个', (done) => {
    Vue.component('XSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
      },
      slots: {
        default: `
        <x-slides-item name="1">
          <div class="box1">1</div>
        </x-slides-item>
        <x-slides-item name="2">
          <div class="box2">2</div>
        </x-slides-item>
        <x-slides-item name="3">
          <div class="box3">3</div>
        </x-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box1').exists()).to.be.true
      done()
    })
  })
  it('selected 是几，选中的就是几', (done) => {
    Vue.component('XSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '2'
      },
      slots: {
        default: `
        <x-slides-item name="1">
          <div class="box1">1</div>
        </x-slides-item>
        <x-slides-item name="2">
          <div class="box2">2</div>
        </x-slides-item>
        <x-slides-item name="3">
          <div class="box3">3</div>
        </x-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box2').exists()).to.be.true
      done()
    })
  })

  it('点击第二个就展示第二个', (done) => {
    Vue.component('XSlidesItem', SlidesItem)
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '1'
      },
      slots: {
        default: `
        <x-slides-item name="1">
          <div class="box1">1</div>
        </x-slides-item>
        <x-slides-item name="2">
          <div class="box2">2</div>
        </x-slides-item>
        <x-slides-item name="3">
          <div class="box3">3</div>
        </x-slides-item>
        `
      },
      listeners: {
        'update:selected': (x) => {
          expect(x).to.eq('2')
          done()
        }
      }
    })
    setTimeout(() => {
      wrapper.find('[data-index="1"]').trigger('click')
    })
  })

  it('会自动播放', (done) => {
    Vue.component('XSlidesItem', SlidesItem)
    const callback = sinon.fake()
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: true,
        selected: '1',
        autoPlayDelay: 20
      },
      slots: {
        default: `
        <x-slides-item name="1">
          <div class="box1">1</div>
        </x-slides-item>
        <x-slides-item name="2">
          <div class="box2">2</div>
        </x-slides-item>
        <x-slides-item name="3">
          <div class="box3">3</div>
        </x-slides-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      expect(callback).to.have.been.calledWith('2')
      done()
    }, 21)
  })
})
