const expect = chai.expect
import Vue from 'vue'
import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsBody from '../src/tabs-body'
import TabsPane from '../src/tabs-pane'
import TabsItem from '../src/tabs-item'
Vue.component('x-tabs', Tabs)
Vue.component('x-tabs-head', TabsHead)
Vue.component('x-tabs-pane', TabsPane)
Vue.component('x-tabs-body', TabsBody)
Vue.component('x-tabs-item', TabsItem)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsHead', () => {
  it('存在.', () => {
    expect(TabsHead).to.exist
  })
})
