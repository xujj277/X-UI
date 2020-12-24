import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Uploader from '../../src/uploader'
import http from '../../src/http'
chai.use(sinonChai)


describe('uploader.vue', () => {
  it('存在.', () => {
    expect(Uploader).to.be.ok
  })
  it('可以上传一个文件', (done) => {
    let stub = sinon.stub(http, 'post').callsFake((url, options) => {
      console.log('假的post')
      setTimeout(() => {
        options.success('{"id": "1223"}')
      }, 100)
    })
    const wrapper = mount(Uploader, {
      propsData: {
        name: 'file',
        action: '/upload',
        method: 'post',
        parseResponse: (response) => {
          let object = JSON.parse(response)
          return `/preview/${object.id}`
        },
        fileList: []
      },
      slots: {
        default: `<button id="x">click me</button>`
      },
      listeners: {
        'update:fileList': (fileList) => {
          wrapper.setProps({fileList})
        },
        'uploaded': () => {
          expect(wrapper.find('use').exists().to.eq(false))
          expect(wrapper.props().fileList[0].url).to.eq('/preview/1223')
          stub.restore()
          done()
        }
      }
    })
    wrapper.find('#x').trigger('click')
    let inputWrapper = wrapper.find('input[type="file"]')
    let input = inputWrapper.element
    let file1 = new File(['xxxx'], 'xx.txt')

    const data = new DataTransfer()
    data.items.add(file1);
    input.files = data.files;

    let use = wrapper.find('use').element
    expect(use.getAttribute('xlink:href').to.eq('#i-loading'))
  })
})
