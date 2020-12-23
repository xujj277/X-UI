import chai,{ expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from '@vue/test-utils'
import Uploader from '../../src/uploader'
chai.use(sinonChai)


describe('uploader.vue', () => {
  it('存在.', () => {
    expect(Uploader).to.be.ok
  })
  it('可以上传一个文件', () => {
    const wrapper = mount(Uploader, {
      propsData: {
        name: 'file',
        action: '/upload',
        parseResponse: () => {}
      },
      slots: {
        default: `<button id="x">click me</button>`
      }
    })
    console.log(wrapper.html())
    wrapper.find('#x').trigger('click')
    console.log(wrapper.html())
    let inputWrapper = wrapper.find('input[type="file"]')
    let input = inputWrapper.element
    let file1 = new File(['xxxx'], 'xx.txt')
    let file2 = new File(['yyyy'], 'yy.txt')

    const data = new DataTransfer()
    data.items.add(file1);
    data.items.add(file2);
    input.files = data.files;
  })
})
